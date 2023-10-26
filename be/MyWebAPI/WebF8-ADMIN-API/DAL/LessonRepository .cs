using DAL.Interfaces;
using DataAccessLayer;
using DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class LessonRepository : ILessonRepository
    {
        private IDatabaseHelper _db;

        public LessonRepository(IDatabaseHelper db)
        {
            _db = db;
        }
        public LessonModel GetDatabyID(string id)
        {
            string msgError = "";
            try
            {
                var dt = _db.ExecuteSProcedureReturnDataTable(out msgError, "sp_lesson_get_by_id",
                     "@id", id);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<LessonModel>().FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public bool Create(LessonModel model)
        {
            string msgError = "";
            try
            {
                var result = _db.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_lesson_create",
                "@Name", model.Name,
                "@Description", model.Description,
                "@VideoId", model.VideoId,
                "@Image", model.Image,
                "@Views", model.Views,
                "@Likes", model.Likes,
                "@CreateAt", model.CreateAt,
                "@CourseId", model.CourseId);
                if ((result != null && !string.IsNullOrEmpty(result.ToString())) || !string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(Convert.ToString(result) + msgError);
                }
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool Update(LessonModel model)
        {
            string msgError = "";
            try
            {
                var result = _db.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_lesson_update",
                "@LessonId", model.LessonId,
                "@Name", model.Name,
                "@Description", model.Description,
                "@VideoId", model.VideoId,
                "@Image", model.Image,
                "@Views", model.Views,
                "@Likes", model.Likes,
                "@CreateAt", model.CreateAt,
                "@CourseId", model.CourseId);
                if ((result != null && !string.IsNullOrEmpty(result.ToString())) || !string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(Convert.ToString(result) + msgError);
                }
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<LessonModel> Search(string name)
        {
            string msgError = "";
            try
            {
                var dt = _db.ExecuteSProcedureReturnDataTable(out msgError, "sp_lesson_search",
                    "@Name", name);
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
