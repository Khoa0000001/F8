using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataModel
{
    public class UserModel
    {
        public int UserId { get; set; }
        public string Name { get; set; }
        public string? Avatar { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public bool Vip { get; set; }
        public List<CourseParticipationModel>? list_json_Participations { get; set; }
    }
}
