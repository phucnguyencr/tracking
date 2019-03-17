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
    public class ContactController : ControllerBase
    {
        private ContactService contactService;
        private TrackingContext _context;
        public ContactController(TrackingContext context)
        {
            _context = context;
            contactService = new ContactService();
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult Get()
        {
            return Ok(contactService.Get(_context));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] string id, [FromBody] Contact contact)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest();
            }
            if (!ModelState.IsValid)
            {
                throw new Exception(Contants.UNVALID);
            }
            var objDB = contactService.Get(_context);
            if (objDB == null)
            {
                throw new Exception(Contants.NOTFOUND);
            }
            objDB.FullName = contact.FullName;
            objDB.Email = contact.Email;
            objDB.PhoneNumber = contact.PhoneNumber;
            objDB.Address = contact.Address;
            await contactService.Update(objDB, _context);
            return NoContent();
        }
    }
}