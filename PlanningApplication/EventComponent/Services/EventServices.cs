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

        public async Task<EventDto?> UploadEventPhoto(Guid Id, byte[] image)
        {
            return convertEventToDTO(await _eventRepository.UploadEventPhoto(Id, image));
        }

        public async Task<EventDto?> AddEvent(EventDto newEvent)
        {
            var eventToAdd = new Event
            {
                Name = newEvent.Name,
                Type = newEvent.Type,
                TicketPrice = newEvent.TicketPrice,
                Date = newEvent.Date,
                StartTime = newEvent.StartTime,
                EndTime = newEvent.EndTime,
                Location = newEvent.Location,
                Format = newEvent.Format,
                Description = newEvent.Description,
                Hashtags = newEvent.Hashtags,
                Budget = newEvent.Budget,
                Categories = newEvent.Categories ?? new List<EventCategory>(),
                AllowedPaymentMethods = newEvent.AllowedPaymentMethods ?? new List<PaymentMethod>(),
                UserId=newEvent.UserId,
                Photo = newEvent.Photo,
            };
            var createdEvent = await _eventRepository.AddEvent(eventToAdd);
            return convertEventToDTO(createdEvent);
        }

        public async Task DeleteEvent(Guid eventId)
        {
           await _eventRepository.DeleteEvent(eventId);
        }

        public async Task<IEnumerable<EventDto>> GetEvents()
        {
            var eventList = await _eventRepository.GetEvents();
            var eventDtoList = new List<EventDto>();
            foreach (var e in eventList)
            {
                eventDtoList.Add(convertEventToDTO(e));
            }
            return eventDtoList;
        }

        public async Task<EventDto?> GetEvent(Guid eventId)
        {
            var eventItem = await _eventRepository.GetEvent(eventId);
            return convertEventToDTO(eventItem);
        }

        public async Task<(EventDto?, bool)> UpdateEvent(EventDto eventToUpdate)
        {
            var eventUpdate = new Models.Event
            {
                Id = eventToUpdate.Id,
                Name = eventToUpdate.Name,
                Type = eventToUpdate.Type,
                TicketPrice = eventToUpdate.TicketPrice,
                Date = eventToUpdate.Date,
                StartTime= eventToUpdate.StartTime,
                EndTime = eventToUpdate.EndTime,
                Location = eventToUpdate.Location,
                Format = eventToUpdate.Format,
                Description = eventToUpdate.Description,
                Hashtags = eventToUpdate.Hashtags,
                Budget = eventToUpdate.Budget,
                Categories = eventToUpdate.Categories,
                AllowedPaymentMethods = eventToUpdate.AllowedPaymentMethods,
                UserId = eventToUpdate.UserId,
                Version = eventToUpdate.Version
            };
            try
            {
                var updatedEvent = await _eventRepository.UpdateEvent(eventUpdate);
                return (convertEventToDTO(updatedEvent), true);
            }
            catch (DbUpdateConcurrencyException) {
                var currentEvent = await _eventRepository.GetEvent(eventToUpdate.Id);
                return (convertEventToDTO(currentEvent), false);
            }
        }

        public async Task<IEnumerable<EventDto>> GetUserEvents(string userId)
        {
            var eventList = await _eventRepository.GetUserEvents(userId);
            var eventDtoList = new List<EventDto>();
            foreach (var e in eventList)
            {
                eventDtoList.Add(convertEventToDTO(e));
            }
            return eventDtoList;
        }

        public async Task<IEnumerable<EventDto>> SearchEventsAsync(string? name, EventType? type, DateTime? startDate, DateTime? endDate,
        TimeSpan? startTime, TimeSpan? endTime, string? location, float? minBudget, float? maxBudget,
        string? categories, string? paymentMethods, string? userId, float? minTicketPrice, float? maxTicketPrice,
        string? description, string? hashtags)
        {
            var searchResult = await _eventRepository.SearchEventsAsync(name, type, startDate, endDate, startTime, endTime, location,
                minBudget, maxBudget, categories, paymentMethods, userId, minTicketPrice, maxTicketPrice, description, hashtags);
            var searchDtoResults = new List<EventDto>();
            foreach(var e in searchResult)
            {
                searchDtoResults.Add(convertEventToDTO(e));
            }
            return searchDtoResults;
        }

        private EventDto convertEventToDTO(Event eventToConvert)
        {
            return new EventDto
            {
                Id = eventToConvert.Id,
                Name = eventToConvert.Name,
                Type = eventToConvert.Type,
                TicketPrice = eventToConvert.TicketPrice,
                Date = eventToConvert.Date,
                StartTime = eventToConvert.StartTime,
                EndTime = eventToConvert.EndTime,
                Location = eventToConvert.Location,
                Format = eventToConvert.Format,
                Description = eventToConvert.Description,
                Hashtags = eventToConvert.Hashtags,
                Budget = eventToConvert.Budget,
                Categories = eventToConvert.Categories,
                AllowedPaymentMethods = eventToConvert.AllowedPaymentMethods,
                UserId = eventToConvert.UserId,
                Version = eventToConvert.Version,
                Photo = eventToConvert.Photo
            };
        }


    }
}
