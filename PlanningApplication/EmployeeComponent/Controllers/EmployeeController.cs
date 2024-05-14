using Microsoft.AspNetCore.Mvc;
using PlanningApplication.EmployeeComponent.Models;
using PlanningApplication.EmployeeComponent.Services;
using PlanningApplication.UsersComponent.Models;
using PlanningApplication.UsersComponent.Services;

namespace PlanningApplication.EmployeeComponent.Controllers;
[ApiController]
[Route("[controller]")]
public class EmployeeController : ControllerBase
{
    private readonly ILogger<EmployeeController> _logger;
    private readonly IEmployeeServices _employeeServices;
    public EmployeeController(ILogger<EmployeeController> logger, IEmployeeServices employeeServices)
    {
        _logger = logger;
        _employeeServices = employeeServices;
    }

    [HttpGet("myemployments")]
    public async Task<ActionResult<List<Employee>>> GetAllEmployments(Guid userId)
    {
        try
        {
            return Ok(await _employeeServices.GetAllEmployments(userId));
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                "Error retrieving data from the database");
        }
    }
    [HttpGet("geteventemployees")]
    public async Task<ActionResult<List<Employee>>> GetEventEmployees(Guid eventId)
    {
        try
        {
            return Ok(await _employeeServices.GetAllEventEmployees(eventId));
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                "Error retrieving data from the database");
        }
    }
    [HttpGet("")]
    public async Task<ActionResult<Employee>> GetById(Guid id)
    {
        try
        {
            return Ok(await _employeeServices.GetEmployee(id));
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                "Error retrieving data from the database");
        }
    }
    [HttpDelete("")]
    public async Task<ActionResult<Employee>> Delete([FromBody]Employee employee)
    {
        try
        {
            return Ok(await _employeeServices.DeleteEmployee(employee));
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                "Error retrieving data from the database");
        }   
    }
    [HttpPut("")]
    public async Task<ActionResult<Employee>> Update([FromBody] Employee employee)
    {
        try
        {
            return Ok(await _employeeServices.UpdateEmployee(employee));
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                "Error retrieving data from the database");
        }
    }
    [HttpPost("")]
    public async Task<ActionResult<Employee>> AddEmployee([FromBody] EmployeeDto employeeDto)
    {
        try
        {
            return Ok(await _employeeServices.AddEmployee(employeeDto));
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                "Error retrieving data from the database");
        }
    }
}