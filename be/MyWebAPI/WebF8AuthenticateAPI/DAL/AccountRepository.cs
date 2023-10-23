using DAL.Interfaces;
using DataAccessLayer;
using DataModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class AccountRepository : IAccountRepository
    {
        private IDatabaseHelper _db;

        public AccountRepository(IDatabaseHelper db)
        {
            _db = db;
        }

        public AccountModel Login(string phonenumber, string password)
        {
            string msgError = "";
            try
            {
                var data = _db.ExecuteSProcedureReturnDataTable(
                    out msgError,
                    "sp_login",
                    "@phonenumber", phonenumber,
                    "@password", password);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return data.ConvertTo<AccountModel>().FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<AccountModel> GetAllAccount()
        {
            string msgError = "";
            try
            {
                var result = _db.ExecuteSProcedureReturnDataTable(out msgError, "sp_account_get_all");

                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return result.ConvertTo<AccountModel>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        
    }
}
