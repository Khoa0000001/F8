using System;
using System.Collections.Generic;

namespace EducationF8_Gateway.Models
{
    public partial class Comment
    {
        public int CommentId { get; set; }
        public string? Content { get; set; }
        public DateTime? CreatedAt { get; set; }
        public int? UserId { get; set; }
        public int? LessonId { get; set; }
        public int? BlogId { get; set; }

        public virtual Blog? Blog { get; set; }
        public virtual Lesson? Lesson { get; set; }
        public virtual User? User { get; set; }
    }
}
