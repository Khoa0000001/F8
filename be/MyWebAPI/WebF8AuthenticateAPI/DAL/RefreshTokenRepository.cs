using DAL.Interfaces;
using DataAccessLayer;
using DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class RefreshTokenRepository: IRefreshTokenRepository
    {
        private IDatabaseHelper _db;

        public RefreshTokenRepository(IDatabaseHelper db)
        {
            _db = db;
        }
        public bool CreateRefreshToken(RefreshTokenModel model)
        {
            string msgError = "";
            try
            {
                var result = _db.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_refreshtoken_create",
                "@RefreshToken", model.RefreshToken,
                "@UserId",model.UserId,
                "@JwtId",model.JwtId,
                "@IsUsed",model.IsUsed,
                "@IsRevoked",model.IsRevoked,
                "@IssuedAt",model.IssuedAt,
                "@ExpiredAt",model.ExpiredAt
                );
                
                if ((result != null && !string.IsNullOrEmpty(result.ToString())) || !string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(Convert.ToString(result) + msgError);
                }
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<RefreshTokenModel> GetAllRefreshToken()
        {
            string msgError = "";
            try
            {
                var result = _db.ExecuteSProcedureReturnDataTable(out msgError, "sp_refreshtoken_get_all");

                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return result.ConvertTo<RefreshTokenModel>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public bool UpdateRefreshToken(RefreshTokenModel model)
        {
            string msgError = "";
            try
            {
                var result = _db.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_refreshtoken_update",
                "@RefreshTokenId", model.RefreshTokenId,
                "@RefreshToken", model.RefreshToken,
                "@UserId", model.UserId,
                "@JwtId", model.JwtId,
                "@IsUsed", model.IsUsed,
                "@IsRevoked", model.IsRevoked,
                "@IssuedAt",model.IssuedAt,
                "@ExpiredAt",model.ExpiredAt
                );
                if ((result != null && !string.IsNullOrEmpty(result.ToString())) || !string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(Convert.ToString(result) + msgError);
                }
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
