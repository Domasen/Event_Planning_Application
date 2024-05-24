using Microsoft.AspNetCore.Mvc;
using PlanningApplication.Data;
using PlanningApplication.EmployeeComponent.Controllers;
using PlanningApplication.EventComponent.Models;
using PlanningApplication.ExpenseComponent.Models;
using PlanningApplication.ExpenseComponent.Services;
namespace PlanningApplication.ExpenseComponent.Controllers;
[ApiController]
[Route("[controller]")]
public class ExpenseController : ControllerBase
{
    private readonly ILogger<EmployeeController> _logger;
    private readonly IExpenseService _expenseService;
    public ExpenseController(ILogger<EmployeeController> logger, IExpenseService expenseService)
    {
        _logger = logger;
        _expenseService = expenseService;
    }
    [HttpGet("GetAll")]
    public async Task<ActionResult<List<Expense>>> GetAll()
    {
        try
        {
            return Ok(await _expenseService.GetAll());
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                "Error retrieving data from the database");
        }
    }
    [HttpDelete("Delete")]
    public async Task<ActionResult<Expense?>> Delete(Expense expense)
    {
        try
        {
            return Ok(await _expenseService.Delete(expense));
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                "Error retrieving data from the database");
        }
    }
    [HttpPut("Update")]
    public async Task<ActionResult<Expense?>> Update(Expense expense)
    {
        try
        {
            return Ok(await _expenseService.Delete(expense));
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                "Error retrieving data from the database");
        }
    }
    [HttpGet("GetById")]
    public async Task<ActionResult<Expense?>> GetById(Guid id)
    {
        try
        {
            return Ok(await _expenseService.GetById(id));
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                "Error retrieving data from the database");
        }
    }
    [HttpPost("Create")]
    public async Task<ActionResult<Expense?>> Create(CustomExpenseDto expenseDto)
    {
        try
        {

            return Ok(await _expenseService.Create(expenseDto));
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                "Error retrieving data from the database");
        }
    }
    [HttpGet("CalculatePrice")]
    public async Task<ActionResult<decimal>> CalculatePrice(Guid eventId)
    {
        try
        {
            return Ok(await _expenseService.CalculatePrice(eventId));
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                "Error retrieving data from the database");
        }
    }
    [HttpGet("GetByEvent")]
    public async Task<ActionResult<List<Expense>>> GetByEvent(Guid eventId)
    {
        try
        {
            return Ok(await _expenseService.GetByEvent(eventId));
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                "Error retrieving data from the database");
        }
    }
}
