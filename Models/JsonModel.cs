using System;
using System.ComponentModel.DataAnnotations;

namespace tracking.Models
{
    public class JsonModel
    {
        [Required]
        [MaxLength(100)]
        public string Title { get; set; }
        [Required]
        public string Desciption { get; set; }
    }
}
