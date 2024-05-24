using Microsoft.AspNetCore.Mvc;
using PlanningApplication.EventComponent.Models;

namespace PlanningApplication.EventComponent.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EventTypeController: ControllerBase
    {
        [HttpGet("getEventTypes")]
        public IActionResult GetEventTypes()
        {
            var eventTypes = Enum.GetValues(typeof(EventType))
                                 .Cast<EventType>()
                                 .Select(e => new { Id = (int)e, Name = e.ToString() })
                                 .ToList();

            return Ok(eventTypes);
        }
    }
}
