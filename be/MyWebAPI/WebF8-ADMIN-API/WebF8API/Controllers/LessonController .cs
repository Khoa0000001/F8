using BLL.Interfaces;
using DataModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;

namespace WebF8API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LessonController : ControllerBase
    {
        private ILessonBusiness _LessonBusiness;
        public LessonController(ILessonBusiness LessonBusiness)
        {
            _LessonBusiness = LessonBusiness;
        }

        [Route("get-by-id/{id}")]
        [HttpGet]
        public ApiResponse GetDatabyID(string id)
        {
            var result = _LessonBusiness.GetDatabyID(id);
            if (result != null)
                return new ApiResponse
                {
                    Success = true,
                    Message = "Get By ID successfully.",
                    Data = result
                };
            return new ApiResponse
            {
                Success = false,
                Message = "Get By ID failed."
            };
        }

        [Route("create-lesson")]
        [HttpPost]
        public ApiResponse CreateItem([FromBody] LessonModel model)
        {
            if (_LessonBusiness.Create(model))
                return new ApiResponse
                {
                    Success = true,
                    Message = "Create Lesson successfully.",
                    Data = model
                };
            return new ApiResponse
            {
                Success = false,
                Message = "Create Lesson failed",
                Data = model
            };
        }
        [Route("update-lesson")]
        [HttpPut]
        public ApiResponse UpdateItem([FromBody] LessonModel model)
        {
            if (_LessonBusiness.Update(model))
                return new ApiResponse
                {
                    Success = true,
                    Message = "Update Lesson successfully.",
                    Data = model
                };
            return new ApiResponse
            {
                Success = false,
                Message = "Update Lesson failed",
                Data = model
            };
        }
        [Route("search-lesson")]
        [HttpGet]
        public List<LessonModel> Search(string name)
        {
            var result = _LessonBusiness.Search(name);
            return result;
        }
    }
}