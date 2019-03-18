using System;
using System.IO;
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
using System.Net.Http.Headers;

namespace tracking_api.Controllers
{
    [Route("tracking/[controller]")]
    [ApiController]
    // [Authorize]
    public class ScheduleController : ControllerBase
    {
        private ScheduleService scheduleService;
        public ScheduleController()
        {
            scheduleService = new ScheduleService();
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult Get()
        {
            return Ok(scheduleService.Get());
        }

        [HttpPost]
        public async Task<IActionResult> Upload()
        {
            var file = Request.Form.Files[0];
            if (file.Length <= 0)
            {
                throw new Exception(Contants.UNVALID);
            }
            string filePath = StringPath.FilesPath("", Contants.EXCELFILE);
            string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
            string fullPath = Path.Combine(filePath, fileName);
            using (var stream = new FileStream(fullPath, FileMode.Create))
            {
                file.CopyTo(stream);
            }
            return NoContent();
        }
    }

}