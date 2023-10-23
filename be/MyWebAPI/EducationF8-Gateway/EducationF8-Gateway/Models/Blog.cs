using System;
using System.Collections.Generic;

namespace EducationF8_Gateway.Models
{
    public partial class Blog
    {
        public Blog()
        {
            Comments = new HashSet<Comment>();
        }

        public int BlogId { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? Image { get; set; }
        public string? Tap { get; set; }
        public DateTime? CreatedAt { get; set; }
        public int? ReadingTime { get; set; }
        public int? UserId { get; set; }

        public virtual User? User { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
    }
}
