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
    public class CourseBusiness : ICourseBusiness
    {
        ICourseRepository _res;
        ICategoryRepository _rescategory;
        public CourseBusiness(ICourseRepository res, ICategoryRepository rescategory)
        {
            _res = res;
            _rescategory = rescategory;
        }

        public CourseModel GetDatabyID(string id)
        {
            if (int.TryParse(id, out _))
                return _res.GetDatabyID(id);
            return null;
        }
        public bool Create(CourseModel model)
        {
            if(_rescategory.GetDatabyID(model.CategoryId.ToString()) != null)
                return _res.Create(model);
           return false;
        }
        public bool Update(CourseModel model)
        {
            if (_rescategory.GetDatabyID(model.CategoryId.ToString()) != null 
                && _res.GetDatabyID(model.CourseId.ToString()) != null)
                return _res.Update(model);
            return false;
        }
        public bool Delete(string id)
        {
            return _res.Delete(id);
        }
        public List<CourseModel> Search(SearchModel model, out long total)
        {
            return _res.Search(model, out total);
        }
    }
}
