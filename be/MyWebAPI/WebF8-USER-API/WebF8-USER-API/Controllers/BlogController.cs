using BLL.Interfaces;
using DataModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebF8_USER_API.Controllers
{
    [Route("api/User/[controller]")]
    [ApiController]
    public class BlogController : ControllerBase
    {
        private IBlogBusiness _BlogBusiness;
        public BlogController(IBlogBusiness uBusiness)
        {
            _BlogBusiness = uBusiness;
        }
        [Route("get-blog-and-userby-id/{id}")]
        [HttpGet]
        public ApiResponse GetBlogAndUserByID(string id)
        {
            var result = _BlogBusiness.GetBlogAndUserByID(id);
            if (result != null)
                return new ApiResponse
                {
                    Success = true,
                    Message = "Get Blog And User ID successfully.",
                    Data = result
                };
            return new ApiResponse
            {
                Success = false,
                Message = "Get Blog And User ID failed."
            };
        }
        [Route("get-list-blog-and-user-soonest")]
        [HttpGet]
        public ApiResponse GetListBlogAndUserSoonest()
        {
            var result = _BlogBusiness.GetListBlogAndUserSoonest();
            if (result != null)
                return new ApiResponse
                {
                    Success = true,
                    Message = "Get List Blog Soonest successfully.",
                    Data = result
                };
            return new ApiResponse
            {
                Success = false,
                Message = "Get List Blog Soonest failed."
            };
        }
    }
}
