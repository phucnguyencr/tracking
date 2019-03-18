using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using tracking.Models;
using tracking.Utils;

namespace tracking.Services
{
    public class ScheduleService
    {
        private string filePath = StringPath.FilesPath("", Contants.EXCELFILE);
        public async Task Update(IFormFile fromFile)
        {
            string fileName = Path.GetFileName(fromFile.FileName);
            string path = Path.Combine(filePath, fileName);
            using (var fileStream = new FileStream(path, FileMode.Create)) {
                await fromFile.CopyToAsync(fileStream);
           }
        }

        public string Get()
        {
            string[] filePaths = Directory.GetFiles(filePath, "*.xlsx || *.xls");
            return filePath;
        }
    }
}
