using DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Interfaces
{
    public interface IRefreshTokenRepository
    {
        bool CreateRefreshToken(RefreshTokenModel model);
        List<RefreshTokenModel> GetAllRefreshToken();
        bool UpdateRefreshToken(RefreshTokenModel model);
    }
}
