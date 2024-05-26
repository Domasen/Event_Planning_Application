using PlanningApplication.Data;
using PlanningApplication.EventComponent.Models;
using PlanningApplication.ExpenseComponent.Models;
using PlanningApplication.ExpenseComponent.Models.Strategies;

namespace PlanningApplication.ExpenseComponent.Services
{
    public interface IExpenseService
    {
        public Task<Expense?> Create(CustomExpenseDto expense);
        public Task<Expense?> Delete(Expense expense);
        public Task<Expense?> GetById(Guid expense);
        public Task<IEnumerable<Expense>> GetAll(Strategy strategy);
        public Task<Expense?> Update(Expense expense);
        public Task<IEnumerable<Expense>> UpdateCalculation(Guid eventId, Strategy strategy);
        public Task<decimal> CalculatePrice(Guid eventId, Strategy strategy);
        public Task<IEnumerable<Expense>> GetByEvent(Guid eventId, Strategy strategy);
    }
}
