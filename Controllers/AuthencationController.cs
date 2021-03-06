using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using tracking.Models;
using tracking.Services;
using tracking.Utils;

namespace tracking.Controllers
{
    [Route("tracking/[controller]")]
    [ApiController]
    [Authorize]
    public class AuthencationController : Controller
    {
        private IConfiguration _config;
        private UserService userService;
        private TrackingContext _context;

        public AuthencationController(IConfiguration config, TrackingContext context)
        {
            userService = new UserService();
            _context = context;
            _config = config;
        }

        [HttpPost]
        [AllowAnonymous]
        public dynamic Login([FromBody] Authencation obj)
        {
            if (userService.Authencation(obj, _context))
            {
                var tokenString = JwtTokenConfig.BuildToken(_config, obj.UserName);
                return Ok(new { token = tokenString });
            }
            return Unauthorized();
        }

        [HttpPut]
        public async Task<dynamic> ChangePassword([FromBody] Authencation obj)
        {
            if (string.IsNullOrEmpty(obj.OldPassword))
            {
                return BadRequest();
            }
            obj.OldPassword = EncryptionUtil.Encrypt(obj.OldPassword, true);
            var objDB = userService.UserExistToChange(obj, _context);
            if (objDB == null) {
                throw new Exception(Contants.NOTFOUND);
            }
            objDB.Password = EncryptionUtil.Encrypt(obj.Password, true);
            await userService.Update(objDB, _context);
            return NoContent();
        }
    }
}
