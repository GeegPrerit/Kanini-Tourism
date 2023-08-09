using Kanini_Tourism.Models;
using Microsoft.EntityFrameworkCore;

namespace Kanini_Tourism.Repository
{
    public class PhotoRepository : IPhotoRepository
    {
        private readonly TourismDbContext _context;

        public PhotoRepository(TourismDbContext context)
        {
            _context = context;
        }
        public void AddPhoto(ImageGallery img)
        {
            _context.Photos.Add(img);
            _context.SaveChanges();
        }

        public void DeletePhoto(int id)
        {
            var img = _context.Photos.Find(id);
            if (img != null)
            {
                _context.Photos.Remove(img);
                _context.SaveChanges();
            }
        }

        public IEnumerable<ImageGallery> GetAllPhoto()
        {
            return _context.Photos.ToList();
        }

        public ImageGallery GetPhotoById(int id)
        {
            var doctor = _context.Photos.Find(id);
            return doctor;
        }

        public void UpdatePhoto(int id, ImageGallery stu)
        {
            /*var existingDoctor = _context.TravelAgents.Find(id);
            if (existingDoctor != null)
            {
                existingDoctor.IsApproved = tra.IsApproved;
                _context.TravelAgents.Update(existingDoctor);
                _context.SaveChanges();
            }*/
        }
    }
}
