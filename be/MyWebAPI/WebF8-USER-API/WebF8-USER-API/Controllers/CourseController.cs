using BLL.Interfaces;
using DataModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebF8_USER_API.Controllers
{
    [Route("api/User/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private ICategoryBusiness _CategoryBusiness;
        private ICourseBusiness _CourseBusiness;
        public CourseController(ICategoryBusiness uBusiness, ICourseBusiness CourseBusiness)
        {
            _CategoryBusiness = uBusiness;
            _CourseBusiness = CourseBusiness;
        }

        [Route("get-all-course-by-id/{id}")]
        [HttpGet]
        public ApiResponse GetAllCourseByID(string id)
        {
            var result = _CategoryBusiness.GetAllCourseByID(id);
            if (result != null)
                return new ApiResponse
                {
                    Success = true,
                    Message = "Get All Course By CategoryID successfully.",
                    Data = result
                };
            return new ApiResponse
            {
                Success = false,
                Message = "Get All Course By CategoryID failed."
            };
        }

        [Route("get-course-by-id/{id}")]
        [HttpGet]
        public ApiResponse GetCourseByID(string id)
        {
            var result = _CourseBusiness.GetByID(id);
            if (result != null)
                return new ApiResponse
                {
                    Success = true,
                    Message = "Get Course By CourseID successfully.",
                    Data = result
                };
            return new ApiResponse
            {
                Success = false,
                Message = "Get Course By CourseID failed."
            };
        }
    }
}
