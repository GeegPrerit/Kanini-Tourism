
using System.ComponentModel.DataAnnotations;

namespace Kanini_Tourism.Models
{
    public class ImageGallery
    {
        
        
            [Key]
            public int? ImageId { get; set; }

            public string? ImageTitle { get; set; }

            public byte[]? Image { get; set; }

            // Other relevant image details
        

    }
}
