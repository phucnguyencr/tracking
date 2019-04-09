using System;
using System.ComponentModel.DataAnnotations;

namespace tracking.Models
{
    public class Contact
    {
        public string ID { get; set; }
        [Required]
        [MaxLength(50)]
        public string FullName { get; set; }
        [Required]
        [MaxLength(50)]
        public string Email { get; set; }
        [Required]
        [MaxLength(20)]
        public string PhoneNumber { get; set; }
        [Required]
        [MaxLength(200)]
        public string Address { get; set; }
    }
}
