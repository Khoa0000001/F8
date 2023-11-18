using DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Interfaces
{
    public interface ILessonRepository
    {
        List<LessonModel> GetListLessonTop();
        List<LessonModel> GetListLessonByCourseID(string id);
    }
}
