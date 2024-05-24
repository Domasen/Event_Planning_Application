using Microsoft.EntityFrameworkCore;
using PlanningApplication.Data;
using PlanningApplication.EventComponent.Models;
using PlanningApplication.ExpenseComponent.Models;

namespace PlanningApplication.ExpenseComponent.Repository
{
    public class ExpenseRepository : IExpenseRepository
    {
        private readonly ApplicationDbContext _context;
        public ExpenseRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Expense?> Create(Expense expense)
        {
            await _context.Expenses.AddAsync(expense);
            await _context.SaveChangesAsync();
            return expense;
        }

        public async Task<Expense?> Delete(Expense expense)
        {
            _context.Expenses.Remove(expense);
            await _context.SaveChangesAsync();
            return expense;
        }

        public async Task<IEnumerable<Expense>> GetAll()
        {
            var CustomExpenses = await _context.Expenses.Include(x => x.assignedEmployees).ToListAsync();
            var FromJobs = new List<Expense>();
            foreach (var job in _context.Jobs)
            {
                var totalHourly = job.assignedEmployees.Select(x => x.HourlyPay).Sum();
                Expense expense = new Expense()
                {
                    Id = job.Id,
                    Name = job.Name,
                    assignedEmployees = job.assignedEmployees,
                    HourlyRate = totalHourly != null ? (decimal)totalHourly : 0,
                    HoursPlanned = job.HoursPlanned,
                    PlannedEvent = job.plannedEvent,

                };
                FromJobs.Add(expense);
            }
            CustomExpenses.AddRange(FromJobs);
            return CustomExpenses;
        }

        public async Task<Expense?> GetById(Guid id)
        {
            return (await GetAll()).Where(x => x.Id == id).First();
        }
        public async Task<IEnumerable<Expense>> GetByEvent(Guid eventId)
        {
            return (await GetAll()).Where(x => x.PlannedEvent.Id == eventId);
        }
        public async Task<Expense?> Update(Expense expense)
        {
            var result = await GetById(expense.Id);
            result.HourlyRate = expense.HourlyRate;
            result.HoursPlanned = expense.HoursPlanned;
            result.assignedEmployees = expense.assignedEmployees;
            result.Name = expense.Name;
            result.CalculationStrategy = expense.CalculationStrategy;
            await _context.SaveChangesAsync();
            return result;
        }
    }
}
