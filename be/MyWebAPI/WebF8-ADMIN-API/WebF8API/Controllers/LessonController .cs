﻿using BLL;
using BLL.Interfaces;
using DataModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;

namespace WebF8API.Controllers
{
    [Route("api/Admin/[controller]")]
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
        [Route("delete-lesson/{id}")]
        [HttpDelete]
        public ApiResponse DeleteItem(string id)
        {
            var result = _LessonBusiness.Delete(id);
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

        [Route("Ins-Upd-Del_list_Lesssons/{status}")]
        [HttpPost]
        public ApiResponse Ins_Upd_Del_list([FromBody] List<LessonModel> model,string status)
        {
            if (_LessonBusiness.Ins_Upd_Del(model,status))
                return new ApiResponse
                {
                    Success = true,
                    Message = status + " Lesson successfully.",
                    Data = model
                };
            return new ApiResponse
            {
                Success = false,
                Message = status + " Lesson failed",
                Data = model
            };
        }

        [Route("search-lesson-by-courseid/{id}")]
        [HttpPost]
        public IActionResult Search([FromBody] SearchModel model,string id)
        {
            try
            {
                long total = 0;
                var data = _LessonBusiness.Search(model, out total,id);

                return Ok(
                    new
                    {
                        TotalItems = total,
                        Data = data,
                        CourseID = id
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