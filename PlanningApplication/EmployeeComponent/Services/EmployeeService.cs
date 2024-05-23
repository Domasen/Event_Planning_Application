using PlanningApplication.EmployeeComponent.Models;
using PlanningApplication.EmployeeComponent.Repository;
using PlanningApplication.JobComponent.Models;
using PlanningApplication.UsersComponent.Models;
using PlanningApplication.UsersComponent.Repository;

namespace PlanningApplication.EmployeeComponent.Services;

public class EmployeeService : IEmployeeService
{

    private readonly IEmployeeRepository _employeeRepository;
    private readonly IUserRepository _userRepository;
    public EmployeeService(IEmployeeRepository employeeRepository, IUserRepository userRepository)
    {
        _employeeRepository = employeeRepository;
        _userRepository = userRepository;
    }
    public async Task<Employee?> AddEmployee(EmployeeDto employee)
    {
        User user = (await _userRepository.GetUsers()).Where(x => x.Email == employee.Email).First();
        Employee employeeModel = new Employee()
        {
            Id = Guid.NewGuid(),
            HourlyPay = decimal.Parse(employee.HourlyRate),
            User = user,
            Jobs = new List<Job>(),
            Position = employee.Position,
            Email = employee.Email
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