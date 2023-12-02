using DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Interfaces
{
    public interface IThongKeRepository
    {
        List<ThongKeTimeModel> GetDataWeek();
        List<ThongKeTimeModel> GetDataMonths();
        List<ThongKeTimeModel> GetDataYears();
    }
}
