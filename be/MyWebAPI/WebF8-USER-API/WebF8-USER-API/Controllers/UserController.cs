using BLL;
using BLL.Interfaces;
using DataModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics.Eventing.Reader;

namespace WebF8_USER_API.Controllers
{
    [Route("api/User/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserBusinesss _UserBusiness;
        private ICourseParticipationBusiness _CPserBusiness;
        public UserController(IUserBusinesss uBusiness, ICourseParticipationBusiness cPserBusiness)
        {
            _UserBusiness = uBusiness;
            _CPserBusiness = cPserBusiness;
        }
        [Route("get-all-CourseParticipations-by-id/{id}")]
        [HttpGet]
        public ApiResponse GetAllCourseParticipationsByID(string id)
        {
            var result = _UserBusiness.GetAllCourseParticipationsByID(id);
            if (result != null)
                return new ApiResponse
                {
                    Success = true,
                    Message = "Get All CourseParticipations ID successfully.",
                    Data = result
                };
            return new ApiResponse
            {
                Success = false,
                Message = "Get All CourseParticipations ID failed.",
                Data = result
            };
        }
        [Route("check-user-register-course/{userid}/{courseid}")]
        [HttpGet]
        public ApiResponse CheckUserRegisterCourse(string userid, string courseid )
        {
            var result = _UserBusiness.CheckUserRegisterCourse(userid, courseid);
            if (result != null)
                return new ApiResponse
                {
                    Success = true,
                    Message = "Get CourseParticipations successfully.",
                    Data = result
                };
            return new ApiResponse
            {
                Success = false,
                Message = "Get CourseParticipations failed.",
                Data = result
            };
        }
        [Route("create-courseParticipation")]
        [HttpPost]
        public ApiResponse CreateItem([FromBody] CourseParticipationModel model)
        {
            var result = _CPserBusiness.CreateCourseParticipation(model);
            if (result != null)
                return new ApiResponse
                {
                    Success = true,
                    Message = "Create CourseParticipation successfully.",
                    Data = result
                };
            return new ApiResponse
            {
                Success = false,
                Message = "Create CourseParticipation failed",
                Data = result
            };
        }
        [Route("update-user")]
        [HttpPost]
        public ApiResponse UpdateUser([FromBody] UserModel model)
        {
            var result = _UserBusiness.UpdateUser(model);
            if (result != null)
                return new ApiResponse
                {
                    Success = true,
                    Message = "Update User successfully.",
                    Data = result
                };
            return new ApiResponse
            {
                Success = false,
                Message = "Update User failed",
                Data = result
            };
        }
        [Route("get-user-id/{id}")]
        [HttpGet]
        public ApiResponse GetUserbyID(string id)
        {
            var result = _UserBusiness.GetUersbyID (id);
            if (result != null)
                return new ApiResponse
                {
                    Success = true,
                    Message = "get User successfully.",
                    Data = result
                };
            return new ApiResponse
            {
                Success = false,
                Message = "get User failed",
                Data = result
            };
        }
    }
}
