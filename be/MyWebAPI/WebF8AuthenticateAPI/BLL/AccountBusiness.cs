using BLL.Interfaces;
using DAL.Interfaces;
using DataModel;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
    public class AccountBusiness : IAccountBusiness
    {
        private IAccountRepository _resAcc;
        private IRefreshTokenRepository _resRftoken;
        private string secret, secretRefresh;
        public AccountBusiness(IAccountRepository resAcc, IRefreshTokenRepository resRftoken, IConfiguration configuration)
        {
            _resAcc = resAcc;
            _resRftoken = resRftoken;
            secret = configuration["AppSettings:Secret"];
            secretRefresh = configuration["AppSettings:SecretRefresh"];
        }

        public TokenModel Login(string phonenumber, string password)
        {
            var user = _resAcc.Login(phonenumber, password);
            if (user == null) return null;

            return GenerateToken(user);
        }
        public TokenModel GenerateToken(AccountModel user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.PhoneNumber.ToString()),
                    new Claim("Role", user.TypeId),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim("AccountId", user.AccountId.ToString()),
                }),
                Expires = DateTime.UtcNow.AddMinutes(20),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature
                )
            };

            var _token = tokenHandler.CreateToken(tokenDescriptor);
            var token = tokenHandler.WriteToken(_token);
            var result = new TokenModel
            {
                AccessToken = token,
                RefreshToken = CreateRefreshToken()
            };

            var CreateDBRefreshToken = _resRftoken.CreateRefreshToken(
               new RefreshTokenModel
               {
                   RefreshToken = result.RefreshToken,
                   JwtId = _token.Id,
                   UserId = user.AccountId,
                   IsUsed = false,
                   IsRevoked = false,
                   IssuedAt = DateTime.UtcNow,
                   ExpiredAt = DateTime.UtcNow.AddMinutes(50),
               }
               );

            return result;
        }
        public string CreateRefreshToken()
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secretRefresh);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim("AccountId", Guid.NewGuid().ToString()),
                }),
                Expires = DateTime.UtcNow.AddMinutes(50),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.Aes192CbcHmacSha384
                )
            };
            var _token = tokenHandler.CreateToken(tokenDescriptor);
            var token = tokenHandler.WriteToken(_token);
            return token;
        }

        public ApiResponse CheckToken(TokenModel model)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var SecretKyeBytes = Encoding.ASCII.GetBytes(secret);
            var tokenValidateParam = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(SecretKyeBytes),
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = false, // khong kiem tra token het han 
            };

            var jwtTokenRefHandler = new JwtSecurityTokenHandler();
            var SecretRefKyeBytes = Encoding.ASCII.GetBytes(secretRefresh);
            var tokenRefValidateParam = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(SecretRefKyeBytes),
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = false, // khong kiem tra token het han 
            };
            try
            {
                //check 1: Accesstoken valid format 
                var tokenInVerification = jwtTokenHandler.ValidateToken(model.AccessToken,
                    tokenValidateParam, out var validatedToken);
                var refreshTokenInVerification = jwtTokenRefHandler.ValidateToken(model.RefreshToken,
                    tokenRefValidateParam, out var validatedRefreshToken);
                //check 2: Kiểm tra thuật toán ?
                if (validatedToken is JwtSecurityToken jwtSecurityToken)
                {
                    var result = jwtSecurityToken.Header.Alg.Equals
                        (SecurityAlgorithms.HmacSha256,
                        StringComparison.InvariantCultureIgnoreCase);
                    if (!result)
                    {
                        return new ApiResponse
                        {
                            Success = false,
                            Message = "Invalid Token"
                        };
                    }
                }
                //check 3: Kiểm tra xem accesstoken đã hết hạn chưa ?
                var utcExpireDate = long.Parse(tokenInVerification.Claims.FirstOrDefault(
                    x =>x.Type == JwtRegisteredClaimNames.Exp).Value);

                var expireDate = ConvertUnixTimeToDateTime(utcExpireDate);
                if(expireDate > DateTime.UtcNow)
                {
                    return new ApiResponse
                    {
                        Success = false,
                        Message = "Access Token Has Not Yet Expire"
                    };
                }
                //check 4: Kiểm tra xem refreshtoken có trong DB không ?
                var storedToken = _resRftoken.GetAllRefreshToken()
                    .FirstOrDefault(x=>x.RefreshToken==model.RefreshToken);
                if(storedToken == null)
                {
                    return new ApiResponse
                    {
                        Success = false,
                        Message = "Refresh Token Does Not Exist"
                    };
                }
                //check 5: Kiểm tra xem refreshtoken đã used/revoked chưa ?
                if (storedToken.IsUsed)
                {
                    return new ApiResponse
                    {
                        Success = false,
                        Message = "Refresh Token Has Been Used"
                    };
                }
                if (storedToken.IsRevoked)
                {
                    return new ApiResponse
                    {
                        Success = false,
                        Message = "Refresh Token Has Been Revoked"
                    };
                }
                //check 6: Kiểm tra xem accesstokenid có == jwtId trong DB không ?
                var jti = tokenInVerification.Claims.FirstOrDefault(
                    x => x.Type == JwtRegisteredClaimNames.Jti).Value;
                if(storedToken.JwtId != jti)
                {
                    return new ApiResponse
                    {
                        Success = false,
                        Message = "Token Dosen't Match"
                    };
                }
                //check 7: Kiểm tra refreshtoken còn hạn không ?
                var utcExpireDateisRefreshtoken = long.Parse(refreshTokenInVerification.Claims.FirstOrDefault(
                    x => x.Type == JwtRegisteredClaimNames.Exp).Value);

                var expireDateRefreshtoken = ConvertUnixTimeToDateTime(utcExpireDateisRefreshtoken);
                if (expireDateRefreshtoken < DateTime.UtcNow)
                {
                    return new ApiResponse
                    {
                        Success = false,
                        Message = "Refresh Token Has Expire"
                    };
                }

                //Update token is used
                storedToken.IsRevoked = true;
                storedToken.IsUsed = true;
                _resRftoken.UpdateRefreshToken(storedToken);

                //Create new token
                var user = _resAcc.GetAllAccount().SingleOrDefault(
                    x => x.AccountId == storedToken.UserId);
                var token = GenerateToken(user);

                return new ApiResponse
                {
                    Success = true,
                    Message = "Renew token success",
                    Data = token
                };
            }
            catch (Exception ex)
            {
                return new ApiResponse
                {
                    Success = false,
                    Message = "Something Went wrong"
                };
            }
        }
        private DateTime ConvertUnixTimeToDateTime(long utcExpireDate)
        {
            var dateTimeInterval = new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);
            dateTimeInterval = dateTimeInterval.AddSeconds(utcExpireDate).ToUniversalTime();

            return dateTimeInterval;
        }
    }
}
