using Microsoft.EntityFrameworkCore;

namespace tracking.Models
{
    public class TrackingContext: DbContext
    {
        public TrackingContext(DbContextOptions<TrackingContext> options): base(options)
        {
        }

        public DbSet<User> User { get; set; }
    }
}
