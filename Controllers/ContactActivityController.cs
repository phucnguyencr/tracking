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
    [Route("tracking/[controller]/[action]")]
    [ApiController]
    [Authorize]
    public class ContactActivityController : ControllerBase
    {
        private ContactActivityService contactActivityService;
        private TrackingContext _context;
        public ContactActivityController(TrackingContext context)
        {
            _context = context;
            contactActivityService = new ContactActivityService();
        }

        [HttpPost]
        [ActionName("Search")]
        public IActionResult SearchContact([FromBody] CriteriaModel condition)
        {
            if (!ModelState.IsValid) {
                throw new Exception(Contants.UNVALID);
            }
            return Ok(contactActivityService.GetByCondition(condition, _context));
        }

        [AllowAnonymous]
        [HttpPost]
        [ActionName("Create")]
        public async Task<IActionResult> Create([FromBody] ContactActivity contact)
        {
            if (!ModelState.IsValid) {
                throw new Exception(Contants.UNVALID);
            }
            await contactActivityService.Create(contact, _context);
            return Created("", contact);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest();
            }
            if (!ModelState.IsValid)
            {
                throw new Exception(Contants.UNVALID);
            }
            var objDB = contactActivityService.GetById(id, _context);
            if (objDB == null)
            {
                throw new Exception(Contants.NOTFOUND);
            }
            objDB.IsRead = true;
            await contactActivityService.Update(objDB, _context);
            return NoContent();
        }
    }
}