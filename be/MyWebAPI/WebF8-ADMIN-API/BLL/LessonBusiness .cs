using BLL.Interfaces;
using DAL.Interfaces;
using DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
    public class LessonBusiness : ILessonBusiness
    {
        ILessonRepository _res;
        ICourseBusiness _courseres;
        public LessonBusiness(ILessonRepository res , ICourseBusiness courseres)
        {
            _res = res;
            _courseres = courseres;
        }

        public LessonModel GetDatabyID(string id)
        {
            if (int.TryParse(id, out _))
                return _res.GetDatabyID(id);
            return null;
        }
        public bool Create(LessonModel model)
        {
            if(_courseres.GetDatabyID(model.CourseId.ToString()) != null)
                return _res.Create(model);
           return false;
        }
        public bool Update(LessonModel model)
        {
            if (_courseres.GetDatabyID(model.CourseId.ToString()) != null 
                && _res.GetDatabyID(model.LessonId.ToString()) != null)
                return _res.Update(model);
            return false;
        }
        public bool Delete(string id)
        {
            return _res.Delete(id);
        }

        public bool Ins_Upd_Del(List<LessonModel> model, string status)
        {
            return _res.Ins_Upd_Del(model, status);
        }
        public List<LessonModel> Search(SearchModel model, out long total, string id)
        {
            return _res.Search(model ,out total,id);
        }
    }
}
