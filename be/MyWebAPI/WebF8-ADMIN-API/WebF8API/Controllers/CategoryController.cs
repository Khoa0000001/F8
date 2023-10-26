using BLL.Interfaces;
using DataModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;

namespace WebF8API.Controllers
{
    [Route("api/Admin/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private ICategoryBusiness _CategoryBusiness;
        public CategoryController(ICategoryBusiness CategoryBusiness)
        {
            _CategoryBusiness = CategoryBusiness;
        }

        [Route("get-by-id/{id}")]
        [HttpGet]
        public ApiResponse GetDatabyID(string id)
        {
            var result = _CategoryBusiness.GetDatabyID(id);
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

        [Route("create-catagory")]
        [HttpPost]
        public ApiResponse CreateItem([FromBody] CategoryModel model)
        {
            if(_CategoryBusiness.Create(model))
                return new ApiResponse
                {
                    Success = true,
                    Message = "Create Category successfully.",
                    Data = model
                };
            return new ApiResponse
            {
                Success = false,
                Message = "Create Category failed",
                Data = model
            };
        }
        [Route("update-catagory")]
        [HttpPut]
        public ApiResponse UpdateItem([FromBody] CategoryModel model)
        {
            if(_CategoryBusiness.Update(model))
                return new ApiResponse
                {
                    Success = true,
                    Message = "Update Category successfully.",
                    Data = model
                };
            return new ApiResponse
            {
                Success = false,
                Message = "Update Category failed",
                Data = model
            };
        }
        [Route("search-catagory")]
        [HttpGet]
        public List<CategoryModel> Search(string name)
        {
           var result = _CategoryBusiness.Search(name);
            return result;
        }
    }
}
