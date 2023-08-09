using FeedBack_Microservices.Model;

namespace FeedBack_Microservices.Repository
{
    public class FeedbackRepository : IfeedbackRepository
    {
        private readonly FeedbackDbContext _context;

        public FeedbackRepository(FeedbackDbContext context)
        {
            _context = context;
        }
        public void AddFeedback(Feedback feed)
        {
            _context.Feedbacks.Add(feed);
            _context.SaveChanges();
        }

        public void DeleteFeedback(int id)
        {
            var feed = _context.Feedbacks.Find(id);
            if (feed != null)
            {
                _context.Feedbacks.Remove(feed);
                _context.SaveChanges();
            }
        }

        public IEnumerable<Feedback> GetAllFeedback()
        {
            return _context.Feedbacks.ToList();
        }

        public Feedback GetFeedbackById(int id)
        {
            var userobj = _context.Feedbacks.Find(id);
            return userobj;
        }

        public void UpdateFeedback(int id, Feedback feed)
        {
            /* var existingDoctor = _context.Feedbacks.Find(id);
             if (existingDoctor != null)
             {
                 existingDoctor.IsApproved = tra.IsApproved;
                 _context.TravelAgents.Update(existingDoctor);
                 _context.SaveChanges();
             }*/
        }
    }
}
