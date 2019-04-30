using EventsMaster.DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;

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
            var userExists = _dbContext.User.Where(u => u.Username == user.Username).Single();

            if(userExists != null)
            {
                return true;
            }
            return false;
        }
    }
}
