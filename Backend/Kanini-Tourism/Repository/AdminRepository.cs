using Kanini_Tourism.Models;

namespace Kanini_Tourism.Repository
{
    public class AdminRepository : IAdminRepository
    {
        private readonly TourismDbContext _context;
        public AdminRepository(TourismDbContext context)
        {
            _context = context;
        }
        public void AddAdministrator(Administrator admin)
        {
            _context.Administrators.Add(admin);
            _context.SaveChanges();
        }

        public void DeleteAdministrator(int id)
        {
            var admin = _context.Administrators.Find(id);
            if (admin != null)
            {
                _context.Administrators.Remove(admin);
                _context.SaveChanges();
            }
        }

        public IEnumerable<Administrator> GetAllAdministrator()
        {
            return _context.Administrators.ToList();
        }

        public Administrator GetAdministratorById(int id)
        {
            var userobj = _context.Administrators.Find(id);
            return userobj;
        }

        public void UpdateAdministrator(int id, Administrator stu)
        {
            var res1 = _context.Administrators.Find(id);
            

            _context.Administrators.Update(res1);
            _context.SaveChanges();
        }
    }
}
