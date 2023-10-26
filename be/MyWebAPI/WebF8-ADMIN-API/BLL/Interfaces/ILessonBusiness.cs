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
        LessonModel GetDatabyID(string id);
        bool Create(LessonModel model);
        bool Update(LessonModel model);
        List<LessonModel> Search(string name);
    }
}
