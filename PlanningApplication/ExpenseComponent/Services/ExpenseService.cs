using PlanningApplication.EmployeeComponent.Repository;
using PlanningApplication.ExpenseComponent.Models;
using PlanningApplication.ExpenseComponent.Repository;
using PlanningApplication.ExpenseComponent.Models;
using PlanningApplication.JobComponent.Models;
using PlanningApplication.Data;
using PlanningApplication.EventComponent.Models;
using PlanningApplication.EventComponent.Repository;
using PlanningApplication.ExpenseComponent.Models.Strategies;

namespace PlanningApplication.ExpenseComponent.Services
{
    public class ExpenseService : IExpenseService
    {
        private readonly IExpenseRepository _expenseRepository;
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IEventRepository _eventRepository;

        public ExpenseService(IExpenseRepository expenseRepository, IEmployeeRepository employeeRepository, IEventRepository eventRepository)
        {
            _expenseRepository = expenseRepository;
            _employeeRepository = employeeRepository;
            _eventRepository = eventRepository;
        }

        public async Task<decimal> CalculatePrice(Guid eventId, Strategy strategy)
        {
            var allExpenses = await _expenseRepository.GetByEvent(eventId, strategy);
            return allExpenses.Sum(x => x.totalCost);
        }

        public async Task<Expense?> Create(CustomExpenseDto expense)
        {
            Expense expenseModel = new Expense()
            {
                Id = Guid.NewGuid(),
                HoursPlanned = int.Parse(expense.HoursWorked),
                HourlyRate = decimal.Parse(expense.HourlyRate),
                Name = expense.JobName,
                assignedEmployees = (await _employeeRepository.GetAll()).Where(x => x.Email == expense.AssignedEmployee).First(),
                PlannedEvent = await _eventRepository.GetEvent(expense.PlannedEvent),
                UsedStrategy = expense.Strategy
            };
            Expense? expenseObject = await _expenseRepository.Create(expenseModel);
            return expenseObject;
        }

        public Task<Expense?> Delete(Expense expense)
        {
            return _expenseRepository.Delete(expense);
        }

        public async Task<IEnumerable<Expense>> GetAll(Strategy strategy)
        {
            return await _expenseRepository.GetAll(strategy);
        }

        public async Task<IEnumerable<Expense>> GetByEvent(Guid eventId, Strategy strategy)
        {
            return await _expenseRepository.GetByEvent(eventId, strategy);
        }

        public async Task<Expense?> GetById(Guid expense)
        {
            return await _expenseRepository.GetById(expense);
        }

        public async Task<Expense?> Update(Expense expense)
        {
            return await _expenseRepository.Update(expense);
        }
        public async Task<IEnumerable<Expense>> UpdateCalculation(Guid eventId, Strategy strategy)
        {
            return await _expenseRepository.UpdateCalculation(eventId, strategy);
        }
    }
}
