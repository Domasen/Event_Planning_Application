using PlanningApplication.Data;
using PlanningApplication.EmployeeComponent.Models;
using PlanningApplication.EventComponent.Models;
using PlanningApplication.ExpenseComponent.Models.Strategies;
using System.ComponentModel.DataAnnotations.Schema;

namespace PlanningApplication.ExpenseComponent.Models
{
    
    public class Expense
    {
        public Guid Id { get; set; }
        public Employee assignedEmployees { get; set; }
        public string Name { get; set; }
        public int HoursPlanned { get; set; }
        public Event PlannedEvent { get; set; }
        public decimal HourlyRate { get; set; }
        public Strategy? UsedStrategy { get; set; }
        [NotMapped]
        public decimal totalCost { get { return CalculationStrategy.CalculateCost(HoursPlanned, HourlyRate); } }
        [NotMapped]
        public ICalculationStrategy CalculationStrategy { get { 
                switch (UsedStrategy) {
                    case Strategy.FlatStrategy:
                        return new FlatStrategy();
                    case Strategy.TaxedStrategy:
                        return new TaxedStrategy();
                    default:
                        return new FlatStrategy();
                }
            }}
    }
}
