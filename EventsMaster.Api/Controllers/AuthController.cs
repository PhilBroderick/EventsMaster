﻿using System;
using System.Collections.Generic;
using System.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using EventsMaster.Api.Models;
using EventsMaster.DAL.DAL;
using EventsMaster.DAL.Interfaces;
using EventsMaster.DAL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace EventsMaster.Api.Controllers
{
    [Route("auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        UserDAL _userDAL;
        private string _connStr;
        IConfiguration _configuration = null;
        public AuthController(IConfiguration config)
        {
            _configuration = config;
            _connStr = _configuration.GetValue<string>("AppSettings:AuthDatabase");
            _userDAL = new UserDAL(_connStr);
        }

        [HttpPost, Route("login")]
        public IActionResult Login([FromBody]AppUser user)
        {
            if (user == null || !ModelState.IsValid)
                return BadRequest("Invalid client request");

            if (userIsValid(user))
            {
                var tokenString = getUserToken();
                return Ok(new { Token = tokenString });
            }
            else
                return Unauthorized();
        }

        [HttpPost, Route("checkusername")]
        public IActionResult CheckUserNameExists([FromBody] UsernameModel username)
        {
            if (username == null)
                return BadRequest("Invalid client request");

            if (usernameIsValid(username))
            {
                return Ok();
            }
            else
                return BadRequest("Username exists");
        }

        [HttpPost, Route("register")]
        public IActionResult Register([FromBody] AppUser user)
        {
            if(user == null || !ModelState.IsValid)
                return BadRequest("Invalid client request");

            if (createUser(user))
            {
                var token = getUserToken();
                return Ok(new { Token = token });
            }
            return BadRequest("Error occured");
                
        }

        [HttpPost, Authorize, Route("userid")]
        public IActionResult GetUserId([FromBody] AppUser user)
        {
            if(user == null || !ModelState.IsValid)
            {
                return BadRequest("Invalid client request");
            }

            var userId = _userDAL.GetUserId(user);

            return Ok(new { userid = userId });
        }

        private bool createUser(AppUser user)
        {
            return _userDAL.CreateNewUser(user);
        }

        private string getUserToken()
        {
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));
            var signInCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

            var tokenOptions = new JwtSecurityToken(
                issuer: "http://localhost:44321",
                audience: "http://localhost:44321",
                claims: new List<Claim>(),
                expires: DateTime.Now.AddMinutes(5),
                signingCredentials: signInCredentials
            );

            return new JwtSecurityTokenHandler().WriteToken(tokenOptions);
        }

        private bool usernameIsValid(UsernameModel username)
        {
            return _userDAL.CheckUsernameIsValid(username);
        }

        private bool userIsValid(IUser user)
        {
            return _userDAL.CheckUserIsValid(user);
        }
    }
}