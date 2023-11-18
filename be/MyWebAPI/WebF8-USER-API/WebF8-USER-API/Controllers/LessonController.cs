using BLL;
using BLL.Interfaces;
using DataModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebF8_USER_API.Controllers
{
    [Route("api/User/[controller]")]
    [ApiController]
    public class LessonController : ControllerBase
    {
        private ILessonBusiness _LessonBusiness;
        public LessonController(ILessonBusiness uBusiness)
        {
            _LessonBusiness = uBusiness;
        }
        [Route("get-list-lesson-top")]
        [HttpGet]
        public ApiResponse GetListLessonTop()
        {
            var result = _LessonBusiness.GetListLessonTop();
            if (result != null)
                return new ApiResponse
                {
                    Success = true,
                    Message = "Get List Lesson Top successfully.",
                    Data = result
                };
            return new ApiResponse
            {
                Success = false,
                Message = "Get List Lesson Top failed."
            };
        }
        [Route("get-list-lesson-by-courseid/{id}")]
        [HttpGet]
        public ApiResponse GetListLessonTop(string id)
        {
            var result = _LessonBusiness.GetListLessonByCourseID(id);
            if (result != null)
                return new ApiResponse
                {
                    Success = true,
                    Message = "Get List Lesson By CourseID successfully.",
                    Data = result
                };
            return new ApiResponse
            {
                Success = false,
                Message = "Get List Lesson By CourseID failed."
            };
        }
    }
}
