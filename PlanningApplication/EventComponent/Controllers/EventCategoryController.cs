using Microsoft.AspNetCore.Mvc;
using PlanningApplication.EventComponent.Models;

namespace PlanningApplication.EventComponent.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EventCategoryController : ControllerBase
    {
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
