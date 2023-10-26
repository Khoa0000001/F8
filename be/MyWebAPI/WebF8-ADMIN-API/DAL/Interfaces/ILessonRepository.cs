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
        LessonModel GetDatabyID(string id);
        bool Create(LessonModel model);
        bool Update(LessonModel model);
        List<LessonModel> Search(string name);
    }
}
