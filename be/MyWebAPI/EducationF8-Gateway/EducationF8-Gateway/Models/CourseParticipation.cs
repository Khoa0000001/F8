using System;
using System.Collections.Generic;

namespace EducationF8_Gateway.Models
{
    public partial class CourseParticipation
    {
        public int ParticipationId { get; set; }
        public int? CourseId { get; set; }
        public int? UserId { get; set; }
        public DateTime? RegistrationDate { get; set; }

        public virtual Course? Course { get; set; }
        public virtual User? User { get; set; }
    }
}
