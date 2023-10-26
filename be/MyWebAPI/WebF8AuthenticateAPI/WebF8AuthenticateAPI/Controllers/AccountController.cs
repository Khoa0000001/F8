using BLL.Interfaces;
using DataModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private IAccountBusiness _accBusiness;
        public AccountController(IAccountBusiness accBusiness)
        {
            _accBusiness = accBusiness;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public IActionResult Login([FromBody] AuthenticateModel model)
        {
            var user = _accBusiness.Login(model.PhoneNumber, model.Password);
            if (user == null) return BadRequest(new { message = "Tài khoản hoặc mật khẩu không đúng!" });
            return Ok(new { AccessToken = user.AccessToken,RefreshToken = user.RefreshToken});
        }

        [HttpPost("RenewToken")]
        public IActionResult RenewToken(TokenModel model)
        {
            var result = _accBusiness.CheckToken(model);
            return Ok(result);
        }

        [Route("Create-Account")]
        [HttpPost]
        public IActionResult CreateAccount([FromBody] AuthenticateModel model)
        {
            var result = _accBusiness.CreateAccount(model.PhoneNumber,model.Password);
            return Ok(result);
        }

    }
}
