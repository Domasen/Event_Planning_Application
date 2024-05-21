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

        public async Task<IEnumerable<Employee>> GetAllEmployments(Guid userId)
        {
            IEnumerable<Employee> employees = new List<Employee>();
            employees = (await _context.Employees.Include(p => p.User).Include(p => p.Jobs).ToListAsync()).Where(x => x.User.Id == userId);
            return employees;
        }

        public async Task<IEnumerable<Employee>> GetAllEventEmployees(Guid eventId)
        {
            IEnumerable<Employee> employees = new List<Employee>();
            employees = (await _context.Employees.Include(p => p.User).Include(p => p.Jobs).ToListAsync());
            return employees;
        }

        public async Task<Employee?> GetEmployee(Guid id)
        {
            IEnumerable<Employee> employees = new List<Employee>();
            employees = (await _context.Employees.Include(p => p.User).Include(p => p.Jobs).ToListAsync()).Where(x => x.Id == id);
            return employees.FirstOrDefault();
        }

        public async Task<Employee?> UpdateEmployee(Employee employee)
        {
            var result = await _context.Employees.SingleOrDefaultAsync(x => x.Id == employee.Id);
            result = employee;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch 
            {
                return result;
            }
            return employee;
        }
    }
}
