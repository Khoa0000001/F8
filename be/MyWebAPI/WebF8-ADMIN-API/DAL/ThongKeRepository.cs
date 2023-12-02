using DAL.Interfaces;
using DataAccessLayer;
using DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class ThongKeRepository: IThongKeRepository
    {
        private IDatabaseHelper _db;

        public ThongKeRepository(IDatabaseHelper db)
        {
            _db = db;
        }
        public List<ThongKeTimeModel>  GetDataWeek()
        {
            string msgError = "";
            try
            {
                var dt = _db.ExecuteSProcedureReturnDataTable(out msgError, "GetMoneyLastWeek");
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<ThongKeTimeModel>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<ThongKeTimeModel> GetDataMonths()
        {
            string msgError = "";
            try
            {
                var dt = _db.ExecuteSProcedureReturnDataTable(out msgError, "GetMoneyByDayLast30Days");
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<ThongKeTimeModel>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<ThongKeTimeModel> GetDataYears()
        {
            string msgError = "";
            try
            {
                var dt = _db.ExecuteSProcedureReturnDataTable(out msgError, "GetMoneyByMonthAllMonths");
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<ThongKeTimeModel>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
