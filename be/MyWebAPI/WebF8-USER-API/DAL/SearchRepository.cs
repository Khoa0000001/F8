using DAL.Interfaces;
using DataAccessLayer;
using DataModel;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class SearchRepository: ISearchRepository
    {
        private IDatabaseHelper _db;

        public SearchRepository(IDatabaseHelper db)
        {
            _db = db;
        }
        public List<SearchCLBModel> SearchCourseLessonBlog(string search)
        {
            string msgError = "";
            try
            {
                var dt = _db.ExecuteSProcedureReturnDataTable(out msgError, "sp_search_course_blog_lesson",
                    "@Search", search);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                //return dt.ConvertTo<SearchCLBModel>().ToList();

                List<SearchCLBModel> searchResults = new List<SearchCLBModel>();

                foreach (DataRow row in dt.Rows)
                {
                    SearchCLBModel result = new SearchCLBModel
                    {
                        TableName = row["TableName"].ToString()
                    };

                    string json = row["list_json"].ToString();
                    // Xác định loại dữ liệu dựa trên TableName và ánh xạ thành đối tượng cụ thể
                    switch (result.TableName)
                    {
                        case "Courses":
                            result.list_json = JsonConvert.DeserializeObject<List<CourseModel>>(json);
                            break;
                        case "Lessons":
                            result.list_json = JsonConvert.DeserializeObject<List<LessonModel>>(json);
                            break;
                        case "Blogs":
                            result.list_json = JsonConvert.DeserializeObject<List<BlogModel>>(json);
                            break;
                        default:
                            // Xử lý trường hợp không xác định
                            break;
                    }

                    searchResults.Add(result);
                }

                return searchResults;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
