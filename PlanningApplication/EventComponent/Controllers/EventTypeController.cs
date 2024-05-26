using Microsoft.AspNetCore.Mvc;
using PlanningApplication.EventComponent.Models;
using PlanningApplication.Interceptors;

namespace PlanningApplication.EventComponent.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EventTypeController: ControllerBase
    {
        [LogAction]
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
