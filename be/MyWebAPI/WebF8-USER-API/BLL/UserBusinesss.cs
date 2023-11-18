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
    public class UserBusinesss : IUserBusinesss
    {
        IUserRepository _res;
        public UserBusinesss(IUserRepository res)   
        {
            _res = res;
        }
        public UserModel GetAllCourseParticipationsByID(string id)
        {
            if (int.TryParse(id, out _))
                return _res.GetAllCourseParticipationsByID(id);
            return null;
        }
        public CourseParticipationModel CheckUserRegisterCourse(string userid, string courseid)
        {
            return _res.CheckUserRegisterCourse(userid, courseid);
        }
    }
}
