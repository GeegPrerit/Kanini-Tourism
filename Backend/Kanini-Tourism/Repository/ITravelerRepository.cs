using Kanini_Tourism.Models;

namespace Kanini_Tourism.Repository
{
    public interface ITravelerRepository
    {
        IEnumerable<Traveler> GetAllTraveler();
        Traveler GetAllTravelerById(int id);
        void AddTraveler(Traveler stu);

        void UpdateTraveler(int id, Traveler stu);
        void DeleteTraveler(int id);
    }
}
