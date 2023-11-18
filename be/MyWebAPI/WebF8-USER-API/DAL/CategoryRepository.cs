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
    public class CategoryRepository : ICategoryRepository
    {
        private IDatabaseHelper _db;

        public CategoryRepository(IDatabaseHelper db)
        {
            _db = db;
        }
        public CategoryModel GetAllCourseByID(string id)
        {
            string msgError = "";
            try
            {
                var dt = _db.ExecuteSProcedureReturnDataTable(out msgError, "sp_category_get_course_by_categoryid",
                    "@CategoryId", id);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<CategoryModel>().FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        
    }
}
