using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace tracking.Models
{
    public class FileModel
    {
        [Required]
        public IFormFile AnyFile { get; set; } 
    }
}
