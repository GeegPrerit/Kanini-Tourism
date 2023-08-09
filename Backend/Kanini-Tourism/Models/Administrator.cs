using System.ComponentModel.DataAnnotations;

namespace Kanini_Tourism.Models
{
    public class Administrator
    {
        [Key]
        public int AdministratorId { get; set; }
        public string? UserName { get; set; }
        public string? Password { get; set; }
        public string? Email { get; set; }
        public string? MobileNumber { get; set; }
        public byte[]? AdminImage { get; set;}
        public virtual ICollection<ImageGallery>? ImageGallery { get; set; }
    }
}
