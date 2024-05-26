using PlanningApplication.Data;
using PlanningApplication.EventComponent.Models;
using PlanningApplication.ExpenseComponent.Models;
using PlanningApplication.ExpenseComponent.Models.Strategies;

namespace PlanningApplication.ExpenseComponent.Repository
{
    public interface IExpenseRepository
    {
        Task<Expense?> GetById(Guid id);
        Task<IEnumerable<Expense>> GetAll(Strategy strategy);
        Task<IEnumerable<Expense>> GetByEvent(Guid eventId, Strategy strategy);
        Task<Expense?> Update(Expense expense);
        Task<Expense?> Delete(Expense expense);
        Task<IEnumerable<Expense>> UpdateCalculation(Guid eventId, Strategy strategy);
        Task<Expense?> Create(Expense expense);
    }
}
