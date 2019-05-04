using System;
using System.Collections.Generic;
using System.Text;

namespace EventsMaster.DAL.Interfaces
{
    public interface IUser
    {
        string Username { get; }
        string Password { get; set; }
        DateTime? Created { get; set; }
        DateTime? LastLoggedIn { get; set; }
    }
}
