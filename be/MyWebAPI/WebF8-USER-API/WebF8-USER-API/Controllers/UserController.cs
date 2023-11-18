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
            if (_CPserBusiness.CreateCourseParticipation(model))
                return new ApiResponse
                {
                    Success = true,
                    Message = "Create CourseParticipation successfully.",
                    Data = model
                };
            return new ApiResponse
            {
                Success = false,
                Message = "Create CourseParticipation failed",
                Data = model
            };
        }
    }
}
