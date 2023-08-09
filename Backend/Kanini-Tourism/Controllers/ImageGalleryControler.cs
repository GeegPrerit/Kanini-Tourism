using Kanini_Tourism.Models;
using Kanini_Tourism.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Kanini_Tourism.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageGalleryControler : ControllerBase
    {
        private readonly IPhotoRepository _context;

        public ImageGalleryControler(IPhotoRepository context)
        {
            _context = context;
        }

        //[Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<ImageGallery>> PostImg([FromForm]ImageGallery img)
        {
            _context.AddPhoto(img);
            return Ok(img);
        }

        [HttpGet]
        public ActionResult<ICollection<ImageGallery>> GetAll()
        {
            var res = _context.GetAllPhoto();
            return Ok(res);
        }

        [HttpGet("{id}")]
        public ActionResult<ICollection<ImageGallery>> GetImgById(int id)
        {
            var res = _context.GetPhotoById(id);
            if (res == null)
            {
                return NotFound();
            }
            return Ok(res);
        }

        [HttpDelete("{id}")]
        public void DeleteImg(int id)
        {
            _context.DeletePhoto(id);
        }

        /*[HttpPut("{id}")]
        public IActionResult UpdateBook(int id, BookingDetail book)
        {
            _context.BookingDetail(id, book);
            return NoContent();
        }*/
    }
}
