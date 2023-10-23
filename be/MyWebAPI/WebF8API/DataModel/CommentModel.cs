﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataModel
{
    public class CommentModel
    {
        public int CommentId { get; set; }
        public string Content { get; set; }
        public DateTime? CreatedAt { get; set; }
        public int UserId { get; set; }
        public int LessonId { get; set; }
        public int BlogId { get; set; }
    }

}