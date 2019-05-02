using EventsMaster.DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EventsMaster.Api.Models
{
    public class UsernameModel : IUsername
    {
        public string Username { get; set; }
    }
}
