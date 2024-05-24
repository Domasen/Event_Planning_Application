using PlanningApplication.EventComponent.Models;

namespace PlanningApplication.EventComponent.Services
{
    public interface IEventServices
    {
        Task<Event?> AddEvent(EventDto newEvent);
        Task DeleteEvent(Guid eventId);
        Task<Event?> GetEvent(Guid eventId);
        Task<IEnumerable<Event>> GetEvents();
        Task<(Event?, bool)> UpdateEvent(EventDto eventToUpdate);
    }
}
