using System;
using System.ComponentModel.DataAnnotations;

namespace tracking.Models
{
    public class Authencation
    {
        [Required]
        [MaxLength(20)]
        public string UserName { get; set; }
        [Required]
        [MaxLength(100)]
        public string Password { get; set; }

        [MaxLength(100)]
        public string OldPassword { get; set; }
    }
}
