using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace FeedBack_Microservices.Model
{
    public class FeedbackDbContext : DbContext
    {
        public DbSet<Feedback> Feedbacks { get; set; }
        public FeedbackDbContext(DbContextOptions<FeedbackDbContext> options)
        : base(options)
        {

        }
    }
}