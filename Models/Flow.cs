﻿using System;
using System.ComponentModel.DataAnnotations;

namespace tracking.Models
{
    public class Flow
    {
        public string ID { get; set; }
        [Required]
        [MaxLength(100)]
        public string Description { get; set; }
        [Required]
        public Int16 StepNo { get; set; }
        [Required]
        [MaxLength(100)]
        public string SubDescription { get; set; }
    }
}