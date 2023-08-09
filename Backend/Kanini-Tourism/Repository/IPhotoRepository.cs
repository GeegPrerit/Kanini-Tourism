using Kanini_Tourism.Models;

namespace Kanini_Tourism.Repository
{
    public interface IPhotoRepository
    {
        IEnumerable<ImageGallery> GetAllPhoto();
        ImageGallery GetPhotoById(int id);
        void AddPhoto(ImageGallery img);

        void UpdatePhoto(int id, ImageGallery stu);
        void DeletePhoto(int id);
    }
}
