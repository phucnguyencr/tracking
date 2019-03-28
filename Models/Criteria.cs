using System;
using System.ComponentModel.DataAnnotations;

namespace tracking.Models
{
    public class CriteriaModel
    {
        [Required]
        public string FieldName { get; set; }
        [Required(AllowEmptyStrings=true)]
        public string FieldFromValue { get; set; }
        [Required(AllowEmptyStrings=true)]
        public string FieldToValue { get; set; }
    }
}
