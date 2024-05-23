using PlanningApplication.Data;

namespace PlanningApplication.ExpenseComponent.Models
{
    public class CustomExpenseDto
    {
        public string JobName { get; set; }
        public string AssignedEmployee { get; set; }
        public string HourlyRate { get; set; }
        public string HoursWorked { get; set; }
        public Event PlannedEvent { get; set; }
    }
}
