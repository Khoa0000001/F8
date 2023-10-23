using System;
using System.Collections.Generic;

namespace EducationF8_Gateway.Models
{
    public partial class User
    {
        public User()
        {
            Blogs = new HashSet<Blog>();
            Comments = new HashSet<Comment>();
            CourseParticipations = new HashSet<CourseParticipation>();
        }

        public int UserId { get; set; }
        public string? Name { get; set; }
        public string? Avatar { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; }
        public bool? Vip { get; set; }

        public virtual Account UserNavigation { get; set; } = null!;
        public virtual ICollection<Blog> Blogs { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<CourseParticipation> CourseParticipations { get; set; }
    }
}
