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
    public class LessonBusiness : ILessonBusiness
    {
        ILessonRepository _res;
        public LessonBusiness(ILessonRepository res)
        {
            _res = res;
        }
        public List<LessonModel> GetListLessonTop()
        {
            return _res.GetListLessonTop();
        }

        public List<LessonModel> GetListLessonByCourseID(string id)
        {
            return _res.GetListLessonByCourseID(id);
        }
    }
}
