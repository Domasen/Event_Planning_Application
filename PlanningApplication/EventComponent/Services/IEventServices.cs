using PlanningApplication.EventComponent.Models;

namespace PlanningApplication.EventComponent.Services
{
    public interface IEventServices
    {
        Task<EventDto?> UploadEventPhoto(Guid Id, byte[] image);
        Task<EventDto?> AddEvent(EventDto newEvent);
        Task DeleteEvent(Guid eventId);
        Task<EventDto?> GetEvent(Guid eventId);
        Task<IEnumerable<EventDto>> GetEvents();
        Task<(EventDto?, bool)> UpdateEvent(EventDto eventToUpdate);
        Task<IEnumerable<EventDto>> GetUserEvents(string userId);

        Task<IEnumerable<EventDto>> SearchEventsAsync(string? name, EventType? type, DateTime? startDate, DateTime? endDate,
        TimeSpan? startTime, TimeSpan? endTime, string? location, float? minBudget, float? maxBudget,
        string? categories, string? paymentMethods, string? userId, float? minTicketPrice, float? maxTicketPrice,
        string? description, string? hashtags);

    }
}
