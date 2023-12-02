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
        bool Delete(string id);
        bool Ins_Upd_Del(List<LessonModel> model, string status);
        List<LessonModel> Search(SearchModel model, out long total,string id);
    }
}
