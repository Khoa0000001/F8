using BLL;
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
        [Route("delete-category/{id}")]
        [HttpDelete]
        public ApiResponse DeleteItem(string id)
        {
            var result = _CategoryBusiness.Delete(id);
            if (result != null)
                return new ApiResponse
                {
                    Success = true,
                    Message = "Delete successfully.",
                    Data = result
                };
            return new ApiResponse
            {
                Success = false,
                Message = "Delete ID failed.",
                Data = false
            };
        }

        [Route("Ins-Upd-Del_list_Category/{status}")]
        [HttpPost]
        public ApiResponse Ins_Upd_Del_list([FromBody] List<CategoryModel> model, string status)
        {
            if (_CategoryBusiness.Ins_Upd_Del(model, status))
                return new ApiResponse
                {
                    Success = true,
                    Message = status + " Category successfully.",
                    Data = model
                };
            return new ApiResponse
            {
                Success = false,
                Message = status + " Category failed",
                Data = model
            };
        }

        [Route("search-category")]
        [HttpPost]
        public IActionResult Search([FromBody] SearchModel model)
        {
            try
            {
                long total = 0;
                var data = _CategoryBusiness.Search(model, out total);

                return Ok(
                    new
                    {
                        TotalItems = total,
                        Data = data,
                        model = model
                    }
                    );
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
