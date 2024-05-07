using Microsoft.AspNetCore.Mvc;
using PlanningApplication.EventComponent.Models;
using PlanningApplication.EventComponent.Services;
using PlanningApplication.UsersComponent.Controllers;

namespace PlanningApplication.EventComponent.Controllers;
[ApiController]
[Route("[controller]")]
public class EventController : ControllerBase
{
    private readonly ILogger<UserController> _logger;
    private readonly IEventServices _eventServices;

    public EventController(ILogger<UserController> logger, IEventServices eventServices)
    {
        _logger = logger;
        _eventServices = eventServices;
    }

    [HttpGet("events")]
    public async Task<ActionResult<List<Event>>> GetEvents()
    {
        try
        {
            return Ok(await _eventServices.GetEvents());
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database");
        }
    }
}

