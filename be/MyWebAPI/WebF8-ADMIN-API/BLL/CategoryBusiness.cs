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
    public class CategoryBusiness: ICategoryBusiness
    {
        ICategoryRepository _res;
        public CategoryBusiness(ICategoryRepository res)
        {
            _res = res;
        }

        public CategoryModel GetDatabyID(string id)
        {
            if (int.TryParse(id, out _))
                return _res.GetDatabyID(id);
            return null;
        }
        public bool Create(CategoryModel model)
        {
            return _res.Create(model);
        }
        public bool Update(CategoryModel model)
        {
            if (_res.GetDatabyID(model.CategoryId.ToString()) != null)
                return _res.Update(model);
            return false;
        }
        public List<CategoryModel> Search(string name)
        {
            return _res.Search(name);
        }
    }
}
