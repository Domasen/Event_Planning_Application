
using PlanningApplication.EventComponent.Models;

namespace PlanningApplication.EventComponent.Repository
{
    public interface IEventRepository
    {
        Task<Event?> AddEvent(Event newEvent);
        Task DeleteEvent(Guid eventId);
        Task<Event?> GetEvent(Guid eventId);
        Task<IEnumerable<Event>> GetEvents();
        Task<Event?> UpdateEvent(Event eventToUpdate);
        Task<IEnumerable<Event>> GetUserEvents(string userId);
    }
}
