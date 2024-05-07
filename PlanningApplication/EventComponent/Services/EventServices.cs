using PlanningApplication.EventComponent.Models;
using PlanningApplication.EventComponent.Repository;

namespace PlanningApplication.EventComponent.Services
{
    public class EventServices : IEventServices
    {
        private readonly IEventRepository _eventRepository;
        public EventServices(IEventRepository eventRepository) 
        { 
            _eventRepository  = eventRepository; 
        }
        public async Task<Event?> AddEvent(EventDto newEvent)
        {
            var eventToAdd = new Event
            {
                Name = newEvent.Name,
                Type = newEvent.Type,
                IsPaid = newEvent.IsPaid,
                TicketPrice = newEvent.TicketPrice,
                Date = newEvent.Date,
                StartTime = newEvent.StartTime,
                EndTime = newEvent.EndTime,
                Location = newEvent.Location,
                Format = newEvent.Format,
                Description = newEvent.Description,
                Hashtags = newEvent.Hashtags,
                Budget = newEvent.Budget,
                AllowedPaymentMethods = newEvent.AllowedPaymentMethods,
            };
            return await _eventRepository.AddEvent(eventToAdd);
        }

        public async Task DeleteEvent(Guid eventId)
        {
           await _eventRepository.DeleteEvent(eventId);
        }

        public async Task<IEnumerable<Event>> GetEvents()
        {
            return await _eventRepository.GetEvents();
        }

        public async Task<Event?> GetEvent(Guid eventId)
        {
            return await _eventRepository.GetEvent(eventId);
        }

        public async Task<Event?> UpdateEvent(Event eventToUpdate)
        {
            return await _eventRepository.UpdateEvent(eventToUpdate);
        }
    }
}
