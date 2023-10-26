﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataModel
{
    public class CourseModel
    {
        public int CourseId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string? Image { get; set; }
        public int Price { get; set; }
        public DateTime? CreatedAt { get; set; }
        public int CategoryId { get; set; }
    }
}
