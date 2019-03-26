using Microsoft.EntityFrameworkCore;

namespace tracking.Models
{
    public class TrackingContext: DbContext
    {
        public TrackingContext(DbContextOptions<TrackingContext> options): base(options)
        {
        }

        public DbSet<User> User { get; set; }
        public DbSet<ContactActivity> ContactActivity { get; set; }
        public DbSet<Contact> Contact { get; set; }
        public DbSet<Flow> Flow { get; set; }
    }
}
