using Microsoft.EntityFrameworkCore;
using PlanningApplication.EmployeeComponent.Models;
using PlanningApplication.JobComponent.Models;
using PlanningApplication.UsersComponent.Models;

namespace PlanningApplication.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
        
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Employee> Employees { get; set; }
    public DbSet<Job> Jobs { get; set; }
    
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

}