using Kanini_Tourism.Models;
using Kanini_Tourism.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Kanini_Tourism.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingDetailsController : ControllerBase
    {
        private readonly IBookingDetailsRepository _context;

        public BookingDetailsController(IBookingDetailsRepository context)
        {
            _context = context;
        }

        //[Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<BookingDetail>> PostBook(BookingDetail d)
        {
            _context.AddBookingDetail(d);
            return Ok(d);
        }

        [HttpGet]
        public ActionResult<ICollection<BookingDetail>> GetAll()
        {
            var res = _context.GetAllBookingDetail();
            return Ok(res);
        }

        [HttpGet("{id}")]
        public ActionResult<ICollection<BookingDetail>> GetBookById(int id)
        {
            var res = _context.GetBookingDetailById(id);
            if (res == null)
            {
                return NotFound();
            }
            return Ok(res);
        }

        [HttpDelete("{id}")]
        public void DeleteBook(int id)
        {
            _context.DeleteBookingDetail(id);
        }

        /*[HttpPut("{id}")]
        public IActionResult UpdateBook(int id, BookingDetail book)
        {
            _context.BookingDetail(id, book);
            return NoContent();
        }*/

        [HttpGet("booking/{UserId}")]

        public IActionResult GetTDetailsByUId(int UserId)
        {

            var res = _context.GetBookingByUserId(UserId);
            return Ok(res);
        }
    }
}
