using BLL.Interfaces;
using DAL.Interfaces;
using DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
    public class ThongKeBusiness: IThongKeBusiness
    {
        IThongKeRepository _res;
        public ThongKeBusiness(IThongKeRepository res)
        {
            _res = res;
        }
        public List<ThongKeTimeModel> GetDataWeek()
        {
            return _res.GetDataWeek();
        }
        public List<ThongKeTimeModel> GetDataMonths()
        {
            return _res.GetDataMonths();
        }
        public List<ThongKeTimeModel> GetDataYears()
        {
            return _res.GetDataYears();
        }
    }
}
