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
    public class FlowController : ControllerBase
    {
        private FlowService flowService;
        private TrackingContext _context;
        public FlowController(TrackingContext context)
        {
            _context = context;
            flowService = new FlowService();
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(flowService.Get(_context));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Flow flow)
        {
            if (!ModelState.IsValid) {
                throw new Exception(Contants.UNVALID);
            }
            if (flowService.FlowExists(flow, _context))
            {
                throw new Exception(Contants.DUPLICATE);
            }
            await flowService.Create(flow, _context);
            return Created("", "");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] string id, [FromBody] Flow flow)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest();
            }
            if (!ModelState.IsValid)
            {
                throw new Exception(Contants.UNVALID);
            }
            var objDB = flowService.FlowExistsById(id, _context);
            if (objDB == null)
            {
                throw new Exception(Contants.NOTFOUND);
            }
            objDB.Description = flow.Description;
            objDB.Name = flow.Name;
            objDB.StepNo = flow.StepNo;
            await flowService.Update(objDB, _context);
            return NoContent();
        }

        [HttpDelete("{id}")]

        public async Task<IActionResult> Delete([FromRoute] string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest();
            }
            var objDB = flowService.FlowExistsById(id, _context);
            if (objDB == null)
            {
                throw new Exception(Contants.NOTFOUND);
            }
            await flowService.Delete(objDB, _context);
            return Ok();
        }
    }
}