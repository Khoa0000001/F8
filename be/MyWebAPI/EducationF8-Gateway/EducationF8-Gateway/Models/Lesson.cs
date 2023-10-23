using System;
using System.Collections.Generic;

namespace EducationF8_Gateway.Models
{
    public partial class Lesson
    {
        public Lesson()
        {
            Comments = new HashSet<Comment>();
        }

        public int LessonId { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string VideoId { get; set; } = null!;
        public string? Image { get; set; }
        public int? Views { get; set; }
        public int? Likes { get; set; }
        public DateTime? CreatedAt { get; set; }
        public int? CourseId { get; set; }

        public virtual Course? Course { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
    }
}
