using Kanini_Tourism.Models;

namespace Kanini_Tourism.Repository
{
    public class TravelDetailRepository : ITravelDetailRepository
    {
        private readonly TourismDbContext _context;
        public TravelDetailRepository(TourismDbContext context)
        {
            _context = context;
        }
        public void AddTravelDetail(TravelDetail trD)
        {
            _context.TravelDetails.Add(trD);
            _context.SaveChanges();
        }

        public void DeleteTravelDetail(int id)
        {
            var detail = _context.TravelDetails.Find(id);
            if (detail != null)
            {
                _context.TravelDetails.Remove(detail);
                _context.SaveChanges();
            }
        }

        public IEnumerable<TravelDetail> GetAllTravelDetail()
        {
            return _context.TravelDetails.ToList();
        }

        public TravelDetail GetTravelDetail(int id)
        {
            var userobj = _context.TravelDetails.Find(id);
            return userobj;
        }
        public List<TravelDetail> GetTravelDetailsById(int AgentId)
        {

            var tours = _context.TravelDetails.Where(t => t.AgentId == AgentId).ToList();
            return tours;
        }
        public void UpdateTravelDetail(int id, TravelDetail stu)
        {
            var res1 = _context.TravelDetails.Find(id);
            

            _context.TravelDetails.Update(res1);
            _context.SaveChanges();
        }
    }
}
