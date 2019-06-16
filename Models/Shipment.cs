using System;
using System.ComponentModel.DataAnnotations;

namespace tracking.Models
{
    public class Shipment
    {
        public string ID { get; set; }
        [Required]
        [MaxLength(30)]
        public string BillOfLading { get; set; }
        [Required]
        [MaxLength(20)]
        public string VoyageNo { get; set; }
        [Required]
        public Double Carton { get; set; }
        [Required]
        public Double Weight { get; set; }
        [Required]
        public Double CubicMeter { get; set; }
        [Required]
        [MaxLength(50)]
        public string Origin { get; set; }
        [Required]
        [MaxLength(10)]
        public string TransShortName { get; set; }
        public DateTime TransArrivalDate { get; set; }
        public DateTime TransDepartureDate { get; set; }
        [Required]
        [MaxLength(10)]
        public string DepShortName { get; set; }
        [Required]
        [MaxLength(30)]
        public string DepVessel { get; set; }
        [Required]
        [MaxLength(100)]
        public string DepContainer { get; set; }
        public DateTime ActDepartureDate { get; set; }
        [Required]
        [MaxLength(50)]
        public string Destination { get; set; }
        [Required]
        [MaxLength(10)]
        public string DestShortName { get; set; }
        [Required]
        [MaxLength(30)]
        public string ArrVessel { get; set; }
        [Required]
        [MaxLength(100)]
        public string ArrContainer { get; set; }
        public DateTime EstArrivalDate { get; set; }
        public DateTime EstDischargeDate { get; set; }
        [Required]
        [MaxLength(50)]
        public string CreatedBy { get; set; }
        [Required]
        public DateTime BookedDate { get; set; }
        [Required]
        public Boolean IsClosed { get; set; }

    }
}
