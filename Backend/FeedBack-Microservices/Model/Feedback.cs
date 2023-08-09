using System.ComponentModel.DataAnnotations;

namespace FeedBack_Microservices.Model
{
       public class Feedback
        {
            [Key]
            public int FeedbackId { get; set; }
            public string FeedbackText { get; set; }
            public int Rating { get; set; }

            
       }
}


