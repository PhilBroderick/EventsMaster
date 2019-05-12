using EventsMaster.DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using EventsMaster.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace EventsMaster.DAL.DAL
{
    public class UserDAL
    {
        private EventsMasterAuthContext _dbContext;
        private string _connectionString;
        public UserDAL(string connStr)
        {
            _connectionString = connStr;
            _dbContext = new EventsMasterAuthContext(_connectionString);
        }
        public bool CheckUserIsValid(IUser user)
        {
            var userExists = _dbContext.User.Where(u => u.Username == user.Username && u.Password == user.Password).SingleOrDefault();

            if(userExists != null)
            {
                return true;
            }
            return false;
        }

        public bool CheckUsernameIsValid(IUsername username)
        {
            var userExists = _dbContext.User.Where(u => u.Username == username.Username).SingleOrDefault();

            if (userExists == null)
                return true;

            return false;
        }

        public bool CreateNewUser(IUser user)
        {
            user.Created = DateTime.Now;
            user.LastLoggedIn = DateTime.Now;

            var userDALModel = new User
            {
                Id = Guid.NewGuid().ToString(),
                Username = user.Username,
                Password = user.Password,
                Created = user.Created,
                LastLoggedIn = user.LastLoggedIn
            };

            CreateModel(userDALModel);

            return true;
        }

        private void CreateModel(User user)
        {
            _dbContext.User.Add(user);
            _dbContext.SaveChanges();
        }

        public string GetUserId(IUser user)
        {
            return _dbContext.User.Where(u => u.Username == user.Username).Select(u => u.Id).Single();
        }
    }
}
