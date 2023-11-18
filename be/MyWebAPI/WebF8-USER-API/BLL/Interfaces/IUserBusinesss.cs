using DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Interfaces
{
    public interface IUserBusinesss
    {
        UserModel GetAllCourseParticipationsByID(string id);
        CourseParticipationModel CheckUserRegisterCourse(string userid, string courseid);
    }
}
