using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PlanningApplication.Data;
using PlanningApplication.EmployeeComponent.Models;
using PlanningApplication.UsersComponent.Models;

namespace PlanningApplication.EmployeeComponent.Repository
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly ApplicationDbContext _context;
        public EmployeeRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Employee?> AddEmployee(Employee employee)
        {
            await _context.Employees.AddAsync(employee);
            await _context.SaveChangesAsync();
            return employee;
        }

        public Employee? DeleteEmployee(Employee employee)
        {
            _context.Employees.Remove(employee);
            _context.SaveChanges();
            return employee;
        }

        public async Task<IEnumerable<Employee>> GetAll()
        {
            return await _context.Employees.Include(x => x.AssignedExpenses).Include(x => x.User).Include(x => x.Jobs).ToListAsync();
        }

        public async Task<IEnumerable<Employee>> GetAllEmployments(Guid userId)
        {
            IEnumerable<Employee> employees = new List<Employee>();
            employees = (await GetAll()).Where(x => x.User.Id == userId);
            return employees;
        }

        public async Task<IEnumerable<Employee>> GetAllEventEmployees(Guid eventId)
        {
            IEnumerable<Employee> employees = new List<Employee>();
            employees = (await GetAll()).Where(x => x.Jobs.Where(x => x.plannedEvent.Id == eventId).Count() != 0);
            return employees;
        }

        public async Task<Employee?> GetEmployee(Guid id)
        {
            IEnumerable<Employee> employees = new List<Employee>();
            employees = (await GetAll()).Where(x => x.Id == id);
            return employees.FirstOrDefault();
        }

        public async Task<Employee?> UpdateEmployee(Employee employee)
        {
            var result = await _context.Employees.SingleOrDefaultAsync(x => x.Id == employee.Id);
            result.Id = employee.Id;
                result.Email = employee.Email;
                result.Jobs = employee.Jobs;
                result.Position = employee.Position;
                result.HourlyPay = employee.HourlyPay;
                await _context.SaveChangesAsync();
            return result;
        }
    }
}