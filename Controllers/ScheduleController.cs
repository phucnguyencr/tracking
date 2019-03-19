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
        private string filePath = StringPath.FilesPath("", Contants.EXCELFILE);

        [HttpGet]
        [AllowAnonymous]
        public IActionResult Download()
        {
            DirectoryInfo di = new DirectoryInfo(filePath);
            string fileName = di.GetFiles().Select(fi => fi.Name).FirstOrDefault();
            byte[] fileBytes = System.IO.File.ReadAllBytes(filePath + fileName);
            return File(fileBytes, System.Net.Mime.MediaTypeNames.Application.Octet, fileName);
        }

        [HttpPost]
        public IActionResult Upload()
        {
            var file = Request.Form.Files[0];
            if (file.Length <= 0)
            {
                throw new Exception(Contants.UNVALID);
            }

            System.IO.DirectoryInfo di = new DirectoryInfo(filePath);
            foreach (FileInfo fi in di.GetFiles())
            {
                fi.Delete(); 
            }

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