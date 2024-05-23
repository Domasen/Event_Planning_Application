using PlanningApplication.Data;
using PlanningApplication.EmployeeComponent.Models;

namespace PlanningApplication.JobComponent.Models
{
    public class Job
    {
        public Guid Id { get; set; }
        public List<Employee> assignedEmployees { get; set; }
        public string Name { get; set; }
        public int HoursPlanned {  get; set; }
        public Event plannedEvent { get; set; }

    }
}
