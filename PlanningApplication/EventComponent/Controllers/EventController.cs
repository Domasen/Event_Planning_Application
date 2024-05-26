using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PlanningApplication.EventComponent.Models;
using PlanningApplication.EventComponent.Services;
using PlanningApplication.UsersComponent.Models;
using System.Security.Claims;

namespace PlanningApplication.EventComponent.Controllers;
[ApiController]
[Route("[controller]")]
public class EventController : ControllerBase
{
    private readonly ILogger<EventController> _logger;
    private readonly IEventServices _eventServices;
    private readonly SignInManager<User> _signInManager;


    public EventController(ILogger<EventController> logger, IEventServices eventServices, SignInManager<User> signInManager)
    {
        _logger = logger;
        _eventServices = eventServices;
        _signInManager = signInManager;
    }

    [HttpGet("getAllEvents")]
    public async Task<ActionResult<List<EventDto>>> GetEvents()
    {
        try
        {
            var eventDto = await _eventServices.GetEvents();
            return Ok(eventDto);
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database");
        }
    }

    [HttpGet("getAllUserEvents")]
    public async Task<ActionResult<List<EventDto>>> GetAllUserEvents()
    {
        var user = _signInManager.Context.User;
        var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);
        try
        {
            var eventDto = await _eventServices.GetUserEvents(userId);
            return Ok(eventDto);
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database");
        }
    }

    [HttpPost("createEvent")]
    public async Task<ActionResult<EventDto>> AddEvent([FromBody] EventDto eventDto)
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

    [HttpGet("getEvent/{id}")]
    public async Task<ActionResult<EventDto>> GetEventById(Guid id)
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
    [HttpDelete("deleteEvent/{id}")]
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
    [HttpPut("updateEvent/{id}")]
    public async Task<IActionResult> UpdateEvent([FromBody] EventDto eventDto)
    {
        var (updatedEvent, success) = await _eventServices.UpdateEvent(eventDto);
        if (success)
        {
            return Ok(updatedEvent);
        }
        else
        {
            return Conflict(updatedEvent);
        }
    }

    [HttpGet("search")]
    public async Task<ActionResult<List<EventDto>>> Search(
        [FromQuery] string? name,
        [FromQuery] EventType? type,
        [FromQuery] DateTime? startDate,
        [FromQuery] DateTime? endDate,
        [FromQuery] TimeSpan? startTime,
        [FromQuery] TimeSpan? endTime,
        [FromQuery] string? location,
        [FromQuery] float? minBudget,
        [FromQuery] float? maxBudget,
        [FromQuery] string? categories,
        [FromQuery] string? paymentMethods,
        [FromQuery] string? userId,
        [FromQuery] float? minTicketPrice,
        [FromQuery] float? maxTicketPrice,
        [FromQuery] string? description,
        [FromQuery] string? hashtags)
    {
        var results = await _eventServices.SearchEventsAsync(name, type, startDate, endDate, startTime, endTime, location,
           minBudget, maxBudget, categories, paymentMethods, userId, minTicketPrice, maxTicketPrice, description, hashtags);
        return Ok(results);
    }

    [HttpGet("searchByCurrentUser")]
    public async Task<ActionResult<List<EventDto>>> SearchByCurrentUser(
        [FromQuery] string name,
        [FromQuery] EventType? type,
        [FromQuery] DateTime? startDate,
        [FromQuery] DateTime? endDate,
        [FromQuery] TimeSpan? startTime,
        [FromQuery] TimeSpan? endTime,
        [FromQuery] string location,
        [FromQuery] float? minBudget,
        [FromQuery] float? maxBudget,
        [FromQuery] string categories,
        [FromQuery] string paymentMethods,
        [FromQuery] float? minTicketPrice,
        [FromQuery] float? maxTicketPrice,
        [FromQuery] string description,
        [FromQuery] string hashtags)
    {

        var user = _signInManager.Context.User;
        var currentUserId = user.FindFirstValue(ClaimTypes.NameIdentifier);
        var results = await _eventServices.SearchEventsAsync(name, type, startDate, endDate, startTime, endTime, location,
           minBudget, maxBudget, categories, paymentMethods, currentUserId, minTicketPrice, maxTicketPrice, description, hashtags);
        return Ok(results);
    }

    [HttpGet("optimisticSearch")]
    public async Task<ActionResult<List<EventDto>>> OptimisticSearch(
        [FromQuery] string searchValue)
    {
        var results = await _eventServices.OptimisticSearchAsync(searchValue);
        return Ok(results);
    }


    [HttpPost("uploadEventPhoto/{id}")]
    public async Task<IActionResult> UploadEventPhoto(Guid id, IFormFile photo)
    {
        if (photo == null || photo.Length == 0)
        {
            return BadRequest("Photo is null or empty.");
        }

        try
        {
            using (var memoryStream = new MemoryStream())
            {
                await photo.CopyToAsync(memoryStream);
                var photoBytes = memoryStream.ToArray();

                var Event = await _eventServices.UploadEventPhoto(id, photoBytes);

                return Ok(Event);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error uploading photo.");
            return StatusCode(StatusCodes.Status500InternalServerError, "Error uploading photo.");
        }
    }

    [HttpGet("getEventPhoto/{id}")]
    public async Task<IActionResult> GetEventPhoto(Guid id)
    {
        try
        {
            var eventItem = await _eventServices.GetEvent(id);
            if (eventItem == null || eventItem.Photo == null)
            {
                return NotFound("Event photo not found.");
            }

            return File(eventItem.Photo, "image/jpeg");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving photo.");
            return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving photo.");
        }
    }
}

