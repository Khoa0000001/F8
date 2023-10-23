using System;
using System.Collections.Generic;

namespace EducationF8_Gateway.Models
{
    public partial class AccountType
    {
        public AccountType()
        {
            Accounts = new HashSet<Account>();
        }

        public string TypeId { get; set; } = null!;
        public string? Type { get; set; }

        public virtual ICollection<Account> Accounts { get; set; }
    }
}
