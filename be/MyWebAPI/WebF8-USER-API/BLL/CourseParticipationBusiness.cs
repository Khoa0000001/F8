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
    public class CourseParticipationBusiness: ICourseParticipationBusiness
    {
        ICourseParticipationRepository _res;
        public CourseParticipationBusiness(ICourseParticipationRepository res)
        {
            _res = res;
        }

        public bool CreateCourseParticipation(CourseParticipationModel model)
        {
            return _res.CreateCourseParticipation(model);
        }
    }
}
