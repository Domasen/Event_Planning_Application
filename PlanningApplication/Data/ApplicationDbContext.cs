using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using PlanningApplication.EventComponent.Models;
using PlanningApplication.UsersComponent.Models;

namespace PlanningApplication.Data;

public class ApplicationDbContext : IdentityDbContext<User>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
        
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Event> Events { get; set; }
    
    // Seed method
    public static void SeedData(ApplicationDbContext context)
    {
        if (!context.Users.Any())  // Checking if the database is empty
        {
            context.Users.AddRange(
                new User { Id = Guid.NewGuid(), Name = "John", Surname = "Doe" },
                new User { Id = Guid.NewGuid(), Name = "Jane", Surname = "Smith" }
            );

            context.SaveChanges();  // Saves the seeded data into the database
        }
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        var converter = new ValueConverter<List<PaymentMethod>, string>(
                v => string.Join(',', v),
                v => v.Split(',', StringSplitOptions.RemoveEmptyEntries).Select(Enum.Parse<PaymentMethod>).ToList());

        var comparer = new ValueComparer<List<PaymentMethod>>(
            (c1, c2) => c1.SequenceEqual(c2),
            c => c.Aggregate(0, (a, v) => HashCode.Combine(a, v.GetHashCode())),
            c => c.ToList()
        );

        modelBuilder.Entity<Event>().Property(e => e.AllowedPaymentMethods)
            .HasConversion(converter).Metadata.SetValueComparer(comparer);

        var categoryConverter = new ValueConverter<List<EventCategory>, string>(
                v => string.Join(',', v),
                v => v.Split(',', StringSplitOptions.RemoveEmptyEntries).Select(Enum.Parse<EventCategory>).ToList());

        var categoryComparer = new ValueComparer<List<EventCategory>>(
            (c1, c2) => c1.SequenceEqual(c2),
            c => c.Aggregate(0, (a, v) => HashCode.Combine(a, v.GetHashCode())),
            c => c.ToList()
        );

        modelBuilder.Entity<Event>().Property(e => e.Categories)
            .HasConversion(categoryConverter).Metadata.SetValueComparer(categoryComparer);

        base.OnModelCreating(modelBuilder);
    }

}