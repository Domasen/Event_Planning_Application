using PlanningApplication.EmployeeComponent.Models;
using PlanningApplication.EmployeeComponent.Repository;

namespace PlanningApplication.EmployeeComponent.Services;

public class EmployeeServices : IEmployeeServices
{

    private readonly IEmployeeRepository _employeeRepository;

    public EmployeeServices(IEmployeeRepository employeeRepository)
    {
        _employeeRepository = employeeRepository;
    }
    public async Task<Employee?> AddEmployee(EmployeeDto employee)
    {
        Employee employeeModel = new Employee()
        {
            Id = Guid.NewGuid(),
            HourlyPay = employee.HourlyPay,
            User = employee.User,
            Jobs = employee.Jobs,
            EventId = employee.EventId
        };
        Employee? employeeObject = await _employeeRepository.AddEmployee(employeeModel);
        return employeeObject;
    }

    public Task<Employee?> DeleteEmployee(Employee employee)
    {
        return Task.FromResult(_employeeRepository.DeleteEmployee(employee));
    }

    public async Task<Employee?> GetEmployee(Guid employeeId)
    {
        return await _employeeRepository.GetEmployee(employeeId);
    }

    public async Task<IEnumerable<Employee>> GetAllEmployments(Guid userId)
    {
        return await _employeeRepository.GetAllEmployments(userId);
    }
    public async Task<IEnumerable<Employee>> GetAllEventEmployees(Guid eventId)
    {
        return await _employeeRepository.GetAllEventEmployees(eventId);
    }

    public async Task<Employee?> UpdateEmployee(Employee employee)
    {
        return await _employeeRepository.UpdateEmployee(employee);
    }
}