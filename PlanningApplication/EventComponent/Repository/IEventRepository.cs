
using PlanningApplication.EventComponent.Models;

namespace PlanningApplication.EventComponent.Repository
{
    public interface IEventRepository
    {
        Task<Event?> UploadEventPhoto(Guid Id, byte[] image);

        Task<Event?> AddEvent(Event newEvent);
        Task DeleteEvent(Guid eventId);
        Task<Event?> GetEvent(Guid eventId);
        Task<IEnumerable<Event>> GetEvents();
        Task<Event?> UpdateEvent(Event eventToUpdate);
        Task<IEnumerable<Event>> GetUserEvents(string userId);
        Task<IEnumerable<Event>> SearchEventsAsync(string? name, EventType? type, DateTime? startDate, DateTime? endDate,
        TimeSpan? startTime, TimeSpan? endTime, string? location, float? minBudget, float? maxBudget,
        string? categories, string? paymentMethods, string userId, float? minTicketPrice, float? maxTicketPrice,
        string? description, string? hashtags);
    }
}
