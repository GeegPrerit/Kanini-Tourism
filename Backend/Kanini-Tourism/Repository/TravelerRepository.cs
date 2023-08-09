using Kanini_Tourism.Models;

namespace Kanini_Tourism.Repository
{
    public class TravelerRepository : ITravelerRepository
    {
        private readonly TourismDbContext _context;
        public TravelerRepository(TourismDbContext context)
        {
            _context = context;
        }
        void ITravelerRepository.AddTraveler(Traveler tr)
        {
            _context.Travelers.Add(tr);
            _context.SaveChanges();
        }

        void ITravelerRepository.DeleteTraveler(int id)
        {
            var res1 = _context.Travelers.Find(id);
            _context.Travelers.Remove(res1);

        }

        IEnumerable<Traveler> ITravelerRepository.GetAllTraveler()
        {
            return _context.Travelers.ToList();
        }

        Traveler ITravelerRepository.GetAllTravelerById(int id)
        {
            var userobj = _context.Travelers.Find(id);
            return userobj;
        }

        void ITravelerRepository.UpdateTraveler(int id, Traveler stu)
        {
            var res1 = _context.Travelers.Find(id);
            
            _context.Travelers.Update(res1);
            _context.SaveChanges();
        }
    }
}
