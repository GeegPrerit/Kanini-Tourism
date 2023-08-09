using System.ComponentModel.DataAnnotations;

namespace Kanini_Tourism.Models
{
    public class TravelAgent
    {
        [Key]
        public int? TravelAgentId { get; set; }
        public string? UserName { get; set; }
        public string? Password { get; set; }
        public string? IsApproved { get; set; }
        

        /*public ICollection<TravelDetail>? TravelDetails { get; set; }
        public ICollection<Traveler>? Travelers { get; set; }*/


    }
}
