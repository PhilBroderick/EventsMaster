using System;
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
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace EventsMaster.Api.Controllers
{
    [Route("auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        UserDAL _userDAL;
        public AuthController()
        {
            _userDAL = new UserDAL();
        }

        [HttpPost, Route("login")]
        public IActionResult Login([FromBody]AppUser user)
        {
            if (user == null || !ModelState.IsValid)
                return BadRequest("Invalid client request");

            if (userIsValid(user))
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

                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
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