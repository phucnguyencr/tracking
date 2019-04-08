using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using tracking.Models;
using tracking.Services;
using tracking.Utils;

namespace tracking_api.Controllers
{
    [Route("tracking/[controller]")]
    [ApiController]
    [Authorize]
    public class UsersController : ControllerBase
    {
        private UserService userService;
        private TrackingContext _context;
        public UsersController(TrackingContext context)
        {
            _context = context;
            userService = new UserService();
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(userService.Get(_context));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] User user)
        {
            if (!ModelState.IsValid) {
                throw new Exception(Contants.UNVALID);
            }
            if (userService.UserExists(user.UserName, _context))
            {
                throw new Exception(Contants.DUPLICATE);
            }
            await userService.Create(user, _context);
            return Created("", "");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] string id, [FromBody] UserUpdate user)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest();
            }
            if (!ModelState.IsValid)
            {
                throw new Exception(Contants.UNVALID);
            }
            var objDB = userService.UserExistById(id, _context);
            if (objDB == null)
            {
                throw new Exception(Contants.NOTFOUND);
            }
            objDB.FullName = user.FullName;
            objDB.Email = user.Email;
            objDB.Active = user.Active;
            await userService.Update(objDB, _context);
            return NoContent();
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> ResetPassword([FromRoute] string id, [FromBody] UserResetPassword user)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest();
            }
            if (!ModelState.IsValid)
            {
                throw new Exception(Contants.UNVALID);
            }
            var objDB = userService.UserExistById(id, _context);
            if (objDB == null)
            {
                throw new Exception(Contants.NOTFOUND);
            }
            objDB.Password = user.Password;
            await userService.Update(objDB, _context);
            return NoContent();
        }

        [HttpDelete("{id}")]

        public async Task<IActionResult> Delete([FromRoute] string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest();
            }
            var objDB = userService.UserExistById(id, _context);
            if (objDB == null)
            {
                throw new Exception(Contants.NOTFOUND);
            }
            await userService.Delete(objDB, _context);
            return Ok();
        }
    }
}