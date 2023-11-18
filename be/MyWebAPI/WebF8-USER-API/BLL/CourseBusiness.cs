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
    public class CourseBusiness: ICourseBusiness
    {
        ICourseRepository _res;
        public CourseBusiness(ICourseRepository res)
        {
            _res = res;
        }
        public CourseModel GetByID(string id)
        {
            return _res.GetByID(id);
        }
    }
}
