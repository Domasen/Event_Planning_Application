using PlanningApplication.Data;
using PlanningApplication.EventComponent.Models;

namespace PlanningApplication.ExpenseComponent.Models
{
    public class CustomExpenseDto
    {
        public string JobName { get; set; }
        public string AssignedEmployee { get; set; }
        public string HourlyRate { get; set; }
        public string HoursWorked { get; set; }
        public Guid PlannedEvent { get; set; }
    }
}
