using PlanningApplication.EmployeeComponent.Models;

namespace PlanningApplication.EmployeeComponent.Repository
{
    public interface IEmployeeRepository
    {
        Task<Employee?> AddEmployee(Employee employee);
        Employee? DeleteEmployee(Employee employee);
        Task<Employee?> GetEmployee(Guid id);
        Task<IEnumerable<Employee>> GetAllEventEmployees(Guid eventId);
        Task<IEnumerable<Employee>> GetAllEmployments(Guid userId);
        Task<Employee?> UpdateEmployee(Employee employee);
        Task<IEnumerable<Employee>> GetAll ();
    }
}