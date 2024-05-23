using PlanningApplication.JobComponent.Models;
using PlanningApplication.UsersComponent.Models;

namespace PlanningApplication.EmployeeComponent.Models
{
    public class Employee
    {
        public User User { get; set; }
        public Guid Id { get; set; } 
        public string Position { get; set; }
        public string Email { get; set; }
        public List<Job> Jobs { get; set; }
        public decimal? HourlyPay { get; set; }
    }
}