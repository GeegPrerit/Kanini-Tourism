using Kanini_Tourism.Models;
using System.Numerics;

namespace Kanini_Tourism.Repository
{
    public interface ITravelAgentRepository
    {
        IEnumerable<TravelAgent> GetAllTravelAgent();
        TravelAgent GetTravelAgentById(int id);
        void AddTravelAgent(TravelAgent stu);

        void UpdateTravelAgent(int id, TravelAgent stu);
        void DeleteTravelAgent(int id);
        public string GetTravelAgentByName(string UserName);
        //public List<TravelDetail> GetTravelDetailsById(int AgentId);
    }
}
