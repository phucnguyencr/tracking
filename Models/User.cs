using System;
using System.ComponentModel.DataAnnotations;

namespace tracking.Models
{
    public class User
    {
        public string ID { get; set; }
        [Required]
        [MaxLength(50)]
        public string FullName { get; set; }
        [Required]
        [MaxLength(100)]
        public string UserName { get; set; }
        [Required]
        [MaxLength(100)]
        public string Password { get; set; }
        [Required]
        [MaxLength(50)]
        public string Email { get; set; }
        [Required]
        public Boolean Active { get; set; }
        public string Role { get; set; }
    }

    public class UserUpdate
    {
        [Required]
        [MaxLength(50)]
        public string FullName { get; set; }
        [Required]
        [MaxLength(50)]
        public string Email { get; set; }
        [Required]
        public Boolean Active { get; set; }
    }

    public class UserResetPassword
    {
        [Required]
        [MaxLength(100)]
        public string Password { get; set; }
    }
}
