using PlanningApplication.Data;
using PlanningApplication.EmployeeComponent.Models;
using PlanningApplication.EventComponent.Models;
using PlanningApplication.UsersComponent.Models;

namespace PlanningApplication.JobComponent.Models
{
    public class JobDto
    {
        public string AssignedEmployee { get; set; }
        public string JobName { get; set; }
        public string HoursPlanned { get; set; }
        public Guid plannedEvent { get; set; }
    }
}