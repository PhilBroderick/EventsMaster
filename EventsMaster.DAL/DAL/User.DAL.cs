using EventsMaster.DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace EventsMaster.DAL.DAL
{
    public class UserDAL
    {
        private EventsMasterAuthContext _dbContext;
        public UserDAL()
        {
            _dbContext = new EventsMasterAuthContext();
        }
        public bool CheckUserIsValid(User user)
        {
            throw new NotImplementedException();
        }
    }
}
