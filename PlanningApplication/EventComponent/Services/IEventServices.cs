using PlanningApplication.EventComponent.Models;

namespace PlanningApplication.EventComponent.Services
{
    public interface IEventServices
    {
        Task<EventDto?> AddEvent(EventDto newEvent);
        Task DeleteEvent(Guid eventId);
        Task<EventDto?> GetEvent(Guid eventId);
        Task<IEnumerable<EventDto>> GetEvents();
        Task<(EventDto?, bool)> UpdateEvent(EventDto eventToUpdate);
        Task<IEnumerable<EventDto>> GetUserEvents(string userId);

    }
}
