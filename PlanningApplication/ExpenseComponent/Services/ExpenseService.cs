using PlanningApplication.EmployeeComponent.Repository;
using PlanningApplication.ExpenseComponent.Models;
using PlanningApplication.ExpenseComponent.Repository;
using PlanningApplication.ExpenseComponent.Models;
using PlanningApplication.JobComponent.Models;

namespace PlanningApplication.ExpenseComponent.Services
{
    public class ExpenseService : IExpenseService
    {
        private readonly IExpenseRepository _expenseRepository;
        private readonly IEmployeeRepository _employeeRepository;

        public ExpenseService(IExpenseRepository expenseRepository, IEmployeeRepository employeeRepository)
        {
            _expenseRepository = expenseRepository;
            _employeeRepository = employeeRepository;
        }

        public async Task<decimal> CalculatePrice()
        {
            var allExpenses = await _expenseRepository.GetAll();
            return allExpenses.Sum(x => x.totalCost);
        }

        public async Task<Expense?> Create(CustomExpenseDto expense)
        {
            Expense expenseModel = new Expense()
            {
                Id = Guid.NewGuid(),
                HoursPlanned = int.Parse(expense.HoursWorked),
                HourlyRate = int.Parse(expense.HourlyRate),
                Name = expense.JobName,
                assignedEmployees = (await _employeeRepository.GetAll()).Where(x => x.Email == expense.AssignedEmployee).ToList(),
            };
            Expense? expenseObject = await _expenseRepository.Create(expenseModel);
            return expenseObject;
        }

        public Task<Expense?> Delete(Expense expense)
        {
            return _expenseRepository.Delete(expense);
        }

        public async Task<IEnumerable<Expense>> GetAll()
        {
            return await _expenseRepository.GetAll();
        }

        public async Task<Expense?> GetById(Guid expense)
        {
            return await _expenseRepository.GetById(expense);
        }

        public async Task<Expense?> Update(Expense expense)
        {
            return await _expenseRepository.Update(expense);
        }
    }
}
