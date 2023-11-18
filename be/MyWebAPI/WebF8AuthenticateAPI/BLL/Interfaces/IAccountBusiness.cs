using DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Interfaces
{
    public interface IAccountBusiness
    {
        UserModel Login(string phonenumber, string password);
        ApiResponse CheckToken(TokenModel model);
        ApiResponse CreateAccount(string phonenumber, string password);

    }
}
