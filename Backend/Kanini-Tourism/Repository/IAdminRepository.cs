using Kanini_Tourism.Models;

namespace Kanini_Tourism.Repository
{
    public interface IAdminRepository
    {
        IEnumerable<Administrator> GetAllAdministrator();
        Administrator GetAdministratorById(int id);
        void AddAdministrator(Administrator stu);

        void UpdateAdministrator(int id, Administrator stu);
        void DeleteAdministrator(int id);
    }
}
