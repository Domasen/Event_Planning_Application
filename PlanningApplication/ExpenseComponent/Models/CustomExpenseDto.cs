using PlanningApplication.Data;
using PlanningApplication.EventComponent.Models;
using PlanningApplication.ExpenseComponent.Models.Strategies;

namespace PlanningApplication.ExpenseComponent.Models
{
    public class CustomExpenseDto
    {
        public string JobName { get; set; }
        public string AssignedEmployee { get; set; }
        public string HourlyRate { get; set; }
        public string HoursWorked { get; set; }
        public Guid PlannedEvent { get; set; }
        public Strategy Strategy { get; set; }
    }
}
