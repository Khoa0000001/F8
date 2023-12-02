using DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Interfaces
{
    public interface IThongKeBusiness
    {
        List<ThongKeTimeModel> GetDataWeek();
        List<ThongKeTimeModel> GetDataMonths();
        List<ThongKeTimeModel> GetDataYears();
    }
}
