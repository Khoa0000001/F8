using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataModel
{
    public class BlogModel
    {
        public int BlogId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string? Image { get; set; }
        public string Tap { get; set; }
        public DateTime? CreatedAt { get; set; }
        public int ReadingTime { get; set; }
        public int UserId { get; set; }
    }
}
