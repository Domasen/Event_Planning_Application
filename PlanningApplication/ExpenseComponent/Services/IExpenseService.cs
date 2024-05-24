using PlanningApplication.Data;
using PlanningApplication.EventComponent.Models;
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
        public Task<decimal> CalculatePrice(Guid eventId);
        public Task<IEnumerable<Expense>> GetByEvent(Guid eventId);
    }
}
