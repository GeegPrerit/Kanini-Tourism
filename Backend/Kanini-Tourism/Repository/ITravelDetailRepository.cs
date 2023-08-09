using Kanini_Tourism.Models;

namespace Kanini_Tourism.Repository
{
    public interface ITravelDetailRepository
    {
        IEnumerable<TravelDetail> GetAllTravelDetail();
        TravelDetail GetTravelDetail(int id);
        void AddTravelDetail(TravelDetail stu);

        void UpdateTravelDetail(int id, TravelDetail stu);
        void DeleteTravelDetail(int id);
        public List<TravelDetail> GetTravelDetailsById(int AgentId);

    }
}
