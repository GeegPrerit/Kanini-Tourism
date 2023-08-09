using Kanini_Tourism.Models;

namespace Kanini_Tourism.Repository
{
    public interface IBookingDetailsRepository
    {
        IEnumerable<BookingDetail> GetAllBookingDetail();
        BookingDetail GetBookingDetailById(int id);
        void AddBookingDetail(BookingDetail stu);

        void UpdateBookingDetail(int id, BookingDetail stu);
        void DeleteBookingDetail(int id);
        public List<BookingDetail> GetBookingByUserId(int UserId);
    }

}
