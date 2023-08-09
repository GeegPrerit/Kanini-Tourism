using System.ComponentModel.DataAnnotations;

namespace Kanini_Tourism.Models
{
    public class Traveler
    {
        [Key]
        public int TravelerId { get; set; }
        public string? TravelerName { get; set; }
        public string? PhoneNumber { get; set; }
        public byte[]? TravellerImage { get; set; }
        public string? UserName { get; set; }
        //public string Email { get; set; }
        public string? Password { get; set; }
        public int? AgentId { get; set; }
        public TravelAgent? TravelAgents { get; set; }

        public ICollection<BookingDetail>? Bookings { get; set; }



    }
}
