using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Kanini_Tourism.Models
{
    public class BookingDetail
    {
        [Key]
        public int BookingId { get; set; }
        public string? TravelerName { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public decimal TotalPrice { get; set; }
        public string Email { get; set; }
        public int MobileNumber { get; set; }
        //selectedplan
        public int? UserId { get; set; } // Foreign Key referencing User table

        [ForeignKey("UserId")]
        public Traveler? Travelers { get; set; }
        public int? TripId { get; set; } // Foreign Key referencing Trip table

        [ForeignKey("TripId")]
        public TravelDetail? TravelDetail { get; set; }

    }
}
