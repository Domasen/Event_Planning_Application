using PlanningApplication.EmployeeComponent.Models;
using PlanningApplication.UsersComponent.Models;

namespace PlanningApplication.EmployeeComponent.Services;

public interface IEmployeeServices
{
    public Task<Employee?> AddEmployee(EmployeeDto employee);
    public Task<Employee?> DeleteEmployee(Employee employee);
    public Task<Employee?> GetEmployee(Guid employeeId);
    public Task<IEnumerable<Employee>> GetAllEmployments(Guid userId);
    public Task<IEnumerable<Employee>> GetAllEventEmployees(Guid eventId);
    public Task<Employee?> UpdateEmployee(Employee employee);
}