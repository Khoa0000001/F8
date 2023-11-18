using DAL.Interfaces;
using DataAccessLayer;
using DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class CourseParticipationRepository: ICourseParticipationRepository
    {
        private IDatabaseHelper _db;

        public CourseParticipationRepository(IDatabaseHelper db)
        {
            _db = db;
        }
        public bool CreateCourseParticipation(CourseParticipationModel model)
        {
            string msgError = "";
            try
            {
                var result = _db.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_courseParticipation_create",
                "@CourseId", model.CourseId,
                "@UserId", model.UserId,
                "@RegistrationDate", DateTime.Now);
                if ((result != null && !string.IsNullOrEmpty(result.ToString())) || !string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(Convert.ToString(result) + msgError);
                }
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
