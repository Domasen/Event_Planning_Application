using Microsoft.EntityFrameworkCore;
using PlanningApplication.EventComponent.Models;
using PlanningApplication.EventComponent.Repository;
using System.Data;

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
                AllowedPaymentMethods = newEvent.AllowedPaymentMethods ?? new List<PaymentMethod>(),
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

        public async Task<(Event?, bool)> UpdateEvent(EventDto eventToUpdate)
        {
            var eventUpdate = new Models.Event
            {
                Id = eventToUpdate.Id,
                Name = eventToUpdate.Name,
                Type = eventToUpdate.Type,
                IsPaid = eventToUpdate.IsPaid,
                TicketPrice = eventToUpdate.TicketPrice,
                Date = eventToUpdate.Date,
                StartTime= eventToUpdate.StartTime,
                EndTime = eventToUpdate.EndTime,
                Location = eventToUpdate.Location,
                Format = eventToUpdate.Format,
                Description = eventToUpdate.Description,
                Hashtags = eventToUpdate.Hashtags,
                Budget = eventToUpdate.Budget,
                AllowedPaymentMethods = eventToUpdate.AllowedPaymentMethods,
                Version = eventToUpdate.Version
            };
            try
            {
                var updatedEvent = await _eventRepository.UpdateEvent(eventUpdate);
                return (updatedEvent, true);
            }
            catch (DbUpdateConcurrencyException) {
                var currentEvent = await _eventRepository.GetEvent(eventToUpdate.Id);
                return (currentEvent, false);
            }
        }
    }
}
