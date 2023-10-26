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
        private ICourseBusiness _CouerseBusiness;
        public CourseController(ICourseBusiness uBusiness)
        {
            _CouerseBusiness = uBusiness;
        }

        [Route("get-by-id/{id}")]
        [HttpGet]
        public ApiResponse GetDatabyID(string id)
        {
            var result = _CouerseBusiness.GetAllByCategoryId(id);
            if (result != null)
                return new ApiResponse
                {
                    Success = true,
                    Message = "Get All By CategoryID successfully.",
                    Data = result
                };
            return new ApiResponse
            {
                Success = false,
                Message = "Get All By CategoryID failed."
            };
        }
    }
}
