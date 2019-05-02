﻿using EventsMaster.DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using EventsMaster.DAL.Interfaces;

namespace EventsMaster.DAL.DAL
{
    public class UserDAL
    {
        private EventsMasterAuthContext _dbContext;
        public UserDAL()
        {
            _dbContext = new EventsMasterAuthContext();
        }
        public bool CheckUserIsValid(IUser user)
        {
            var userExists = _dbContext.User.Where(u => u.Username == user.Username && u.Password == user.Password).Single();

            if(userExists != null)
            {
                return true;
            }
            return false;
        }

        public bool CheckUsernameIsValid(IUsername username)
        {
            var userExists = _dbContext.User.Where(u => u.Username == username.Username).Single();

            if (userExists == null)
                return true;

            return false;
        }
    }
}
