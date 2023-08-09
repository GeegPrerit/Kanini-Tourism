using Kanini_Tourism.Models;

namespace Kanini_Tourism.Repository
{
    public class BookingDetailsRepository : IBookingDetailsRepository
    {
        private readonly TourismDbContext _context;

        public BookingDetailsRepository(TourismDbContext context)
        {
            _context = context;
        }
        public void AddBookingDetail(BookingDetail book)
        {
            _context.BookingDetails.Add(book);
            _context.SaveChanges();
        }

        public void DeleteBookingDetail(int id)
        {
            var book = _context.BookingDetails.Find(id);
            if (book != null)
            {
                _context.BookingDetails.Remove(book);
                _context.SaveChanges();
            }
        }

        public IEnumerable<BookingDetail> GetAllBookingDetail()
        {
            return _context.BookingDetails.ToList();
        }

        public BookingDetail GetBookingDetailById(int id)
        {
            var userobj = _context.BookingDetails.Find(id);
            return userobj;
        }

        public void UpdateBookingDetail(int id, BookingDetail stu)
        {
            /*var existingDoctor = _context.TravelAgents.Find(id);
            if (existingDoctor != null)
            {
                existingDoctor.IsApproved = tra.IsApproved;
                _context.TravelAgents.Update(existingDoctor);
                _context.SaveChanges();
            }*/
        }

        public List<BookingDetail> GetBookingByUserId(int UserId)
        {

            var booking = _context.BookingDetails.Where(t => t.UserId == UserId).ToList();
            return booking;
        }
    }
}
