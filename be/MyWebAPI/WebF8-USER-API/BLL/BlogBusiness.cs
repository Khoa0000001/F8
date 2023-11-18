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
    public class BlogBusiness : IBlogBusiness
    {
        IBlogRepository _res;
        public BlogBusiness(IBlogRepository res)
        {
            _res = res;
        }
        public BlogModel GetBlogAndUserByID(string id)
        {
            if (int.TryParse(id, out _))
                return _res.GetBlogAndUserByID(id);
            return null;
        }
        public List<BlogModel> GetListBlogAndUserSoonest()
        {
            return _res.GetListBlogAndUserSoonest();
        }
    }
}
