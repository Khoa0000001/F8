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
        public bool Create(CourseModel model);
        public bool Update(CourseModel model);
        public List<CourseModel> Search(string name);
    }
}
