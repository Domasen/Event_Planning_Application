namespace PlanningApplication.ExpenseComponent.Models.Strategies
{
    public class TaxedStrategy : ICalculationStrategy
    {
        public decimal CalculateCost(int hours, decimal cost)
        {
            decimal ValueAddedTax = (decimal)1.21;
            return hours * cost * ValueAddedTax;
        }
    }
}
