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
    public class SearchBusiness: ISearchBusiness
    {
        ISearchRepository _res;
        public SearchBusiness(ISearchRepository res)
        {
            _res = res;
        }
        public List<SearchCLBModel> SearchCourseLessonBlog(string search)
        {
            return _res.SearchCourseLessonBlog(search);
        }
    }
}
