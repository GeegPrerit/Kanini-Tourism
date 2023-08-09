using FeedBack_Microservices.Model;

namespace FeedBack_Microservices.Repository
{
    public interface IfeedbackRepository
    {
        IEnumerable<Feedback> GetAllFeedback();
        Feedback GetFeedbackById(int id);
        void AddFeedback(Feedback stu);

        void UpdateFeedback(int id, Feedback stu);
        void DeleteFeedback(int id);
    }
}
