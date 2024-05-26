using Microsoft.AspNetCore.Mvc;
using PlanningApplication.EventComponent.Models;
using PlanningApplication.Interceptors;

namespace PlanningApplication.EventComponent.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EventCategoryController : ControllerBase
    {
        [LogAction]
        [HttpGet("getEventCategories")]
        public IActionResult GetEventTypes()
        {
            var eventTypes = Enum.GetValues(typeof(EventCategory))
                                 .Cast<EventCategory>()
                                 .Select(e => new { Id = (int)e, Name = e.ToString() })
                                 .ToList();

            return Ok(eventTypes);
        }
    }
}
