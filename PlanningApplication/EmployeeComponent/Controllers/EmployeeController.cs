using Microsoft.AspNetCore.Mvc;
using PlanningApplication.EmployeeComponent.Models;
using PlanningApplication.EmployeeComponent.Services;
using PlanningApplication.Interceptors;
using PlanningApplication.JobComponent.Models;
using PlanningApplication.UsersComponent.Models;
using PlanningApplication.UsersComponent.Services;

namespace PlanningApplication.EmployeeComponent.Controllers;
[ApiController]
[Route("[controller]")]
public class EmployeeController : ControllerBase
{
    private readonly ILogger<EmployeeController> _logger;
    private readonly IEmployeeService _employeeService;
    public EmployeeController(ILogger<EmployeeController> logger, IEmployeeService employeeServices)
    {
        _logger = logger;
        _employeeService = employeeServices;
    }
    [LogAction]
    [HttpGet("MyEmployments")]
    public async Task<ActionResult<List<Employee>>> GetAllEmployments(Guid userId)
    {
        try
        {
            return Ok(await _employeeService.GetAllEmployments(userId));
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                "Error retrieving data from the database");
        }
    }
    [LogAction]
    [HttpGet("GetEventEmployees")]
    public async Task<ActionResult<List<Employee>>> GetEventEmployees(Guid eventId)
    {
        try
        {
            return Ok(await _employeeService.GetAllEventEmployees(eventId));
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                "Error retrieving data from the database");
        }
    }
    [LogAction]
    [HttpGet("GetById")]
    public async Task<ActionResult<Employee>> GetById(Guid id)
    {
        try
        {
            return Ok(await _employeeService.GetEmployee(id));
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                "Error retrieving data from the database");
        }
    }
    [LogAction]
    [HttpDelete("Delete")]
    public async Task<ActionResult<Employee>> Delete([FromBody] Employee employee)
    {
        try
        {
            return Ok(await _employeeService.DeleteEmployee(employee));
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                "Error retrieving data from the database");
        }
    }
    [LogAction]
    [HttpPut("Update")]
    public async Task<ActionResult<Employee>> Update([FromBody] Employee employee)
    {
        try
        {
            return Ok(await _employeeService.UpdateEmployee(employee));
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                "Error retrieving data from the database");
        }
    }
    [LogAction]
    [HttpPost("Create")]
    public async Task<ActionResult<Employee>> AddEmployee(EmployeeDto employeeDto)
    {
        try
        {
            return Ok(await _employeeService.AddEmployee(employeeDto));
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                "Error retrieving data from the database");
        }
    }
    [LogAction]
    [HttpGet("GetAll")]
    public async Task<ActionResult<Employee>> GetAll()
    {
        try
        {
            return Ok(await _employeeService.GetAll());
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                "Error retrieving data from the database");
        }
    }
}