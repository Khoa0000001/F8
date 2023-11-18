using BLL;
using BLL.Interfaces;
using DataModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebF8_USER_API.Controllers
{
    [Route("api/User/[controller]")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        private ISearchBusiness _SearchBusiness;
        public SearchController(ISearchBusiness uBusiness)
        {
            _SearchBusiness = uBusiness;
        }
        [Route("search-course-lesson-blog")]
        [HttpGet]
        public ApiResponse SearchCLB(string search)
        {
            var result = _SearchBusiness.SearchCourseLessonBlog(search);
            if(result != null)
                return new ApiResponse
                {
                    Success = true,
                    Message = "Search successfully.",
                    Data = result
                };
            return new ApiResponse
            {
                Success = false,
                Message = "Search failed."
            };
        }
    }
}
