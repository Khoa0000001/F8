using DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Interfaces
{
    public interface ICategoryBusiness
    {
        CategoryModel GetDatabyID(string id);
        bool Create(CategoryModel model);
        bool Update(CategoryModel model);
        bool Delete(string id);
        bool Ins_Upd_Del(List<CategoryModel> model, string status);
        List<CategoryModel> Search(SearchModel model, out long total);
    }
}
