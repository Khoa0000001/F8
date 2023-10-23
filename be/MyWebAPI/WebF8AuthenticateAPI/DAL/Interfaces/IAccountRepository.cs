using DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Interfaces
{
    public interface IAccountRepository
    {
        AccountModel Login(string phonenumber, string password);
        List<AccountModel> GetAllAccount();

    }
}
