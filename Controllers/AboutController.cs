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
    public class AboutController : ControllerBase
    {
        private AboutService aboutService;
        public AboutController()
        {
            aboutService = new AboutService();
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult Get()
        {
            var jsonData = aboutService.Get();
            return Ok(jsonData.Result);
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] JsonModel about)
        {
            if (!ModelState.IsValid)
            {
                throw new Exception(Contants.UNVALID);
            }
            await aboutService.Update(about);
            return NoContent();
        }
    }

}