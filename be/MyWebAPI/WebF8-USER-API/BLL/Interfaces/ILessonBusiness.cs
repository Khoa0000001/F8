using DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Interfaces
{
    public interface ILessonBusiness
    {
        List<LessonModel> GetListLessonTop();
        List<LessonModel> GetListLessonByCourseID(string id);
    }
}
