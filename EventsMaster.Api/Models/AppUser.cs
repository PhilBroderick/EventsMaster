using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EventsMaster.Api.Models
{
    public class AppUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}
