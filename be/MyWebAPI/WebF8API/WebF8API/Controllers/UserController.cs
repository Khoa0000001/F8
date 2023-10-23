using BLL.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebF8API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserBusiness _uBusiness;
        public UserController(IUserBusiness uBusiness)
        {
            _uBusiness = uBusiness;
        }

        [Route("get-by-id/{id}")]
        [HttpGet]
        public IActionResult GetDataById(string id)
        {
            var dt = _uBusiness.GetDataById(id);
            return Ok(dt);
        }

    }
}
