using PlanningApplication.Data;
using PlanningApplication.ExpenseComponent.Models;

namespace PlanningApplication.ExpenseComponent.Services
{
    public interface IExpenseService
    {
        public Task<Expense?> Create(CustomExpenseDto expense);
        public Task<Expense?> Delete(Expense expense);
        public Task<Expense?> GetById(Guid expense);
        public Task<IEnumerable<Expense>> GetAll();
        public Task<Expense?> Update(Expense expense);
        public Task<decimal> CalculatePrice();
        public Task<IEnumerable<Expense>> GetByEvent(Event heldEvent);
    }
}
