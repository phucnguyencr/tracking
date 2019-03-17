using System;
using System.ComponentModel.DataAnnotations;

namespace tracking.Models
{
    public class ContactActivity
    {
        public string ID { get; set; }
        [Required]
        [MaxLength(50)]
        public string FullName { get; set; }
        [Required]
        [MaxLength(100)]
        public string Company { get; set; }
        [Required]
        [MaxLength(50)]
        public string Email { get; set; }
        [Required]
        [MaxLength(20)]
        public string Phone { get; set; }
        [Required]
        [MaxLength(200)]
        public string Message { get; set; }
        public DateTime CreatedDate { get; set; }
        public Boolean IsRead { get; set; }
    }
}
