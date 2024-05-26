namespace PlanningApplication.ExpenseComponent.Models.Strategies
{
    public class FlatStrategy : ICalculationStrategy
    {
        public decimal CalculateCost(int hours, decimal cost)
        {
            return hours * cost;
        }
    }
}
