using System;
using System.Collections.Generic;

namespace EventsMaster.DAL.Models
{
    public partial class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public DateTime? Created { get; set; }
        public DateTime? LastLoggedIn { get; set; }
    }
}
