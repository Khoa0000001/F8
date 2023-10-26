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
        public bool Create(CategoryModel model);
        public bool Update(CategoryModel model);
        public List<CategoryModel> Search(string name);
    }
}
