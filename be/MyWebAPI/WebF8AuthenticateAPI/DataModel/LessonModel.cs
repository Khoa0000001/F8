using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataModel
{
    public class LessonModel
    {
        public int LessonId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string? VideoId { get; set; }
        public string? Image { get; set; }
        public int Views { get; set; }
        public int Likes { get; set; }
        public int CourseId { get; set; }
    }
}
