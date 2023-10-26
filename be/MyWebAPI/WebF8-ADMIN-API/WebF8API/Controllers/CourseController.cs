using BLL.Interfaces;
using DataModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;

namespace WebF8API.Controllers
{
    [Route("api/Admin/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private ICourseBusiness _CouerseBusiness;
        public CourseController(ICourseBusiness uBusiness)
        {
            _CouerseBusiness = uBusiness;
        }

        [Route("get-by-id/{id}")]
        [HttpGet]
        public ApiResponse GetDatabyID(string id)
        {
            var result = _CouerseBusiness.GetDatabyID(id);
            if(result != null)
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

        [Route("create-course")]
        [HttpPost]
        public ApiResponse CreateItem([FromBody] CourseModel model)
        {
            if(_CouerseBusiness.Create(model))
                return new ApiResponse
                {
                    Success = true,
                    Message = "Create Course successfully.",
                    Data = model
                };
            return new ApiResponse
            {
                Success = false,
                Message = "Create Course failed",
                Data = model
            };
        }
        [Route("update-course")]
        [HttpPut]
        public ApiResponse UpdateItem([FromBody] CourseModel model)
        {
            if(_CouerseBusiness.Update(model))
                return new ApiResponse
                {
                    Success = true,
                    Message = "Update Course successfully.",
                    Data = model
                };
            return new ApiResponse
            {
                Success = false,
                Message = "Update Course failed",
                Data = model
            };
        }
        [Route("search-course")]
        [HttpGet]
        public List<CourseModel> Search(string name)
        {
           var result = _CouerseBusiness.Search(name);
            return result;
        }
    }
}
