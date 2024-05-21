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

    [HttpPost("createEvent")]
    public async Task<ActionResult<Event>> AddEvent([FromBody] EventDto eventDto)
    {
        if (eventDto == null)
        {
            return BadRequest("Event data is null.");
        }

        try
        {
            var createdEvent = await _eventServices.AddEvent(eventDto);

            if (createdEvent == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error creating new event.");
            }

            return CreatedAtAction(nameof(GetEventById), new { id = createdEvent.Id }, createdEvent);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating new event.");
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating new event.");
        }
    }

    [HttpGet("events/{id}")]
    public async Task<ActionResult<Event>> GetEventById(Guid id)
    {
        try
        {
            var eventItem = await _eventServices.GetEvent(id);

            if (eventItem == null)
            {
                return NotFound($"Event with ID = {id} not found.");
            }

            return eventItem;
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database");
        }
    }
    [HttpDelete("events/{id}")]
    public async Task<IActionResult> DeleteEvent(Guid id)
    {
        try
        {
            var eventToDelete = await _eventServices.GetEvent(id);

            if (eventToDelete == null)
            {
                return NotFound($"Event with ID = {id} not found.");
            }

            await _eventServices.DeleteEvent(id);

            return NoContent(); // 204 No Content
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting event.");
            return StatusCode(StatusCodes.Status500InternalServerError, "Error deleting event.");
        }
    }
}

