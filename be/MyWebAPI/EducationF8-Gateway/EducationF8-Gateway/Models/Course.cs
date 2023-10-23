using System;
using System.Collections.Generic;

namespace EducationF8_Gateway.Models
{
    public partial class Course
    {
        public Course()
        {
            CourseParticipations = new HashSet<CourseParticipation>();
            Lessons = new HashSet<Lesson>();
        }

        public int CourseId { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Image { get; set; }
        public int? Price { get; set; }
        public DateTime? CreatedAt { get; set; }
        public int? CategoryId { get; set; }

        public virtual Category? Category { get; set; }
        public virtual ICollection<CourseParticipation> CourseParticipations { get; set; }
        public virtual ICollection<Lesson> Lessons { get; set; }
    }
}
