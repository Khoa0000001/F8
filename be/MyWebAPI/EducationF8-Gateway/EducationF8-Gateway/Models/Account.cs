using System;
using System.Collections.Generic;

namespace EducationF8_Gateway.Models
{
    public partial class Account
    {
        public int AccountId { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Password { get; set; }
        public string? TypeId { get; set; }

        public virtual AccountType? Type { get; set; }
        public virtual User? User { get; set; }
    }
}
