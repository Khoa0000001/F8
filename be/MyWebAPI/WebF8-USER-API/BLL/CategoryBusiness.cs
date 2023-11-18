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
    public class CategoryBusiness : ICategoryBusiness
    {
        ICategoryRepository _res;
        public CategoryBusiness (ICategoryRepository res)
        {
            _res = res;
        }
        public CategoryModel GetAllCourseByID(string id)
        {
            if(int.TryParse(id, out _))
               return _res.GetAllCourseByID(id);
            return null;
        }
    }
}
