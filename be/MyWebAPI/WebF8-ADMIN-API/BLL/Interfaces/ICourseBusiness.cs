using DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Interfaces
{
    public interface ICourseBusiness
    {
        CourseModel GetDatabyID(string id);
         bool Create(CourseModel model);
         bool Update(CourseModel model);
         bool Delete(string id);
         List<CourseModel> Search(SearchModel model, out long total);
    }
}
