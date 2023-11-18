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
        UserModel Login(string phonenumber, string password);
        List<UserModel> GetAllUser();
        bool CreateAccount(string phonenumber, string password);
        AccountModel GetDatabyPhonenumber(string phonenumber);

    }
}
