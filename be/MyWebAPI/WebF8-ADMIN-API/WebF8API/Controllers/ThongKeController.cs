using BLL.Interfaces;
using DataModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebF8API.Controllers
{
    [Route("api/Admin/[controller]")]
    [ApiController]
public class ThongKeController : ControllerBase
{
        private IThongKeBusiness _TKBusiness;
        public ThongKeController(IThongKeBusiness TKBusiness)
        {
            _TKBusiness = TKBusiness;
        }
        [Route("get-tk-data-week")]
        [HttpGet]
        public ApiResponse GetDataWeek()
        {
            var result = _TKBusiness.GetDataWeek();
            if (result != null)
                return new ApiResponse
                {
                    Success = true,
                    Message = "Get Data Week successfully.",
                    Data = result
                };
            return new ApiResponse
            {
                Success = false,
                Message = "Get Data Week failed.",
                Data = result
            };
        }
        [Route("get-tk-data-months")]
        [HttpGet]
        public ApiResponse GetDataMonths()
        {
            var result = _TKBusiness.GetDataMonths();
            if (result != null)
                return new ApiResponse
                {
                    Success = true,
                    Message = "Get Data Months successfully.",
                    Data = result
                };
            return new ApiResponse
            {
                Success = false,
                Message = "Get Data Months failed.",
                Data = result
            };
        }
        [Route("get-tk-data-years")]
        [HttpGet]
        public ApiResponse GetDataYears()
        {
            var result = _TKBusiness.GetDataYears();
            if (result != null)
                return new ApiResponse
                {
                    Success = true,
                    Message = "Get Data Year successfully.",
                    Data = result
                };
            return new ApiResponse
            {
                Success = false,
                Message = "Get Data Year failed.",
                Data = result
            };
        }
    }
}
