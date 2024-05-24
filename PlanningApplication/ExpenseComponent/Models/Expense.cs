using PlanningApplication.Data;
using PlanningApplication.EmployeeComponent.Models;
using PlanningApplication.EventComponent.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace PlanningApplication.ExpenseComponent.Models
{
    
    public class Expense
    {
        public interface ICalculationStrategy
        {
            decimal CalculateCost(int hours, decimal cost);
        }
        public class FlatStrategy : ICalculationStrategy
        {
            public decimal CalculateCost(int hours, decimal cost)
            {
                return hours * cost;
            }
        }
        public class TaxedStrategy : ICalculationStrategy
        {
            public decimal CalculateCost(int hours, decimal cost)
            {
                decimal ValueAddedTax = (decimal)1.21;
                return hours * cost * ValueAddedTax;
            }
        }
        public Guid Id { get; set; }
        public List<Employee> assignedEmployees { get; set; }
        public string Name { get; set; }
        public int HoursPlanned { get; set; }
        public Event PlannedEvent { get; set; }
        public decimal HourlyRate { get; set; }
        [NotMapped]
        public decimal totalCost { get { return CalculationStrategy.CalculateCost(HoursPlanned, HourlyRate); } }
        [NotMapped]
        public ICalculationStrategy CalculationStrategy { get; set; } = new TaxedStrategy();
    }
}
