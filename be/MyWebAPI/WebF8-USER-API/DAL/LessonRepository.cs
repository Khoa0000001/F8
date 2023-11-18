using DAL.Interfaces;
using DataAccessLayer;
using DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace DAL
{
    public class LessonRepository : ILessonRepository
    {
        private IDatabaseHelper _db;

        public LessonRepository(IDatabaseHelper db)
        {
            _db = db;
        }
        public List<LessonModel> GetListLessonTop()
        {
            string msgError = "";
            try
            {
                var dt = _db.ExecuteSProcedureReturnDataTable(out msgError, "sp_lesson_get_top");
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<LessonModel>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<LessonModel> GetListLessonByCourseID(string id)
        {
            string msgError = "";
            try
            {
                var dt = _db.ExecuteSProcedureReturnDataTable(out msgError, "sp_lesson_get_by_courseid",
                    "@CourseID",id);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<LessonModel>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
