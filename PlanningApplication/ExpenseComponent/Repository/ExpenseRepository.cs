using Microsoft.EntityFrameworkCore;
using PlanningApplication.Data;
using PlanningApplication.EventComponent.Models;
using PlanningApplication.ExpenseComponent.Models;
using static PlanningApplication.ExpenseComponent.Models.Expense;

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
            var CustomExpenses = await _context.Expenses.Include(x => x.assignedEmployees).Include(x => x.assignedEmployees.User).Include(x => x.PlannedEvent).ToListAsync();
            var FromJobs = new List<Expense>();
            foreach (var job in _context.Jobs.Include(x => x.assignedEmployees.User).Include(x => x.assignedEmployees).Include(x => x.plannedEvent))
            {
                var totalHourly = job.assignedEmployees.HourlyPay;
                Expense expense = new Expense()
                {
                    Id = job.Id,
                    Name = job.Name,
                    assignedEmployees = job.assignedEmployees,
                    HourlyRate = totalHourly != null ? (decimal)totalHourly : 0,
                    HoursPlanned = job.HoursPlanned,
                    PlannedEvent = job.plannedEvent,
                    CalculationStrategy = new FlatStrategy()
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
