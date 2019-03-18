using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using tracking.Models;
using tracking.Utils;

namespace tracking.Services
{
    public class AboutService
    {
        private string filePath = StringPath.FilesPath("aboutConfig.json", Contants.JSONFILE);
        public async Task Update(JsonModel jsonModel)
        {
            var jsonData = JsonConvert.SerializeObject(jsonModel);
            await File.WriteAllTextAsync(filePath, jsonData);
        }

        public async Task<JsonModel> Get()
        {
            var jsonData = await File.ReadAllTextAsync(filePath);
            return JsonConvert.DeserializeObject<JsonModel>(jsonData);
        }
    }
}
