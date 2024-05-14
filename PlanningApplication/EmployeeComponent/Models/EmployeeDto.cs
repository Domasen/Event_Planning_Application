using PlanningApplication.JobComponent.Models;
using PlanningApplication.UsersComponent.Models;

namespace PlanningApplication.EmployeeComponent.Models
{
    public class EmployeeDto
    {
        public User User { get; set; }
        public Guid EventId { get; set; }
        public List<Job> Jobs { get; set; }
        public decimal? HourlyPay { get; set; }
    }
}
