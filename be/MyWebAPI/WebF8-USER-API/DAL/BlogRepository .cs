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
    public class BlogRepository : IBlogRepository
    {
        private IDatabaseHelper _db;

        public BlogRepository(IDatabaseHelper db)
        {
            _db = db;
        }
        public BlogModel GetBlogAndUserByID(string id)
        {
            string msgError = "";
            try
            {
                var dt = _db.ExecuteSProcedureReturnDataTable(out msgError, "sp_blog_get_blog_and_user_by_blogid",
                    "@BlogId", id);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<BlogModel>().FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<BlogModel> GetListBlogAndUserSoonest()
        {
            string msgError = "";
            try
            {
                var dt = _db.ExecuteSProcedureReturnDataTable(out msgError, "sp_blog_and_user_get_soonest");
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<BlogModel>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
