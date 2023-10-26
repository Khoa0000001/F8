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
    public class CourseBusiness : ICourseBusiness
    {
        ICourseRepository _res;
        public CourseBusiness (ICourseRepository res)
        {
            _res = res;
        }
        public List<CourseModel> GetAllByCategoryId(string id)
        {
            if(int.TryParse(id, out _))
               return _res.GetAllByCategoryID(id);
            return null;
        }
    }
}
