namespace PlanningApplication.ExpenseComponent.Models.Strategies
{
    public interface ICalculationStrategy
    {
        decimal CalculateCost(int hours, decimal cost);
    }
}
