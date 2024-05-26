using Microsoft.EntityFrameworkCore;
using PlanningApplication.Data;
using PlanningApplication.EventComponent.Models;
using System.Linq;

namespace PlanningApplication.EventComponent.Repository
{
    public class EventRepository : IEventRepository
    {
        private readonly ApplicationDbContext _context;

        public EventRepository(ApplicationDbContext context) {
            _context = context;
        }

        public async Task<Event?> UploadEventPhoto(Guid Id, byte[] image)
        {
            var eventToAddPhoto = await _context.Events.FindAsync(Id);
            if (eventToAddPhoto == null)
            {
                throw new KeyNotFoundException("Event not found.");
            }

            eventToAddPhoto.Photo = image;
            
            await _context.SaveChangesAsync();
             
            return await _context.Events.FindAsync(Id);
        }

        public async Task<Event?> AddEvent(Event newEvent)
        {
            newEvent.Version = Guid.NewGuid();
            _context.Events.Add(newEvent);
            await _context.SaveChangesAsync();
            var databseEvent = await _context.Events.FindAsync(newEvent.Id);
            return databseEvent;
        }

        public async Task DeleteEvent(Guid eventId)
        {
            var eventToDelete = await _context.Events.FindAsync(eventId);
            if (eventToDelete == null)
            {
                throw new KeyNotFoundException("Event not found.");
            }
            _context.Events.Remove(eventToDelete);
            await _context.SaveChangesAsync();
        }

        public async Task<Event?> GetEvent(Guid eventId)
        {
            return await _context.Events.FindAsync(eventId);
        }

        public async Task<IEnumerable<Event>> GetEvents()
        {
            return await _context.Events.ToListAsync();
        }

        public async Task<IEnumerable<Event>> GetUserEvents(string userId)
        {
            return await _context.Events.Where<Event>((x)=> x.UserId == userId).ToListAsync();
        }

        public async Task<Event?> UpdateEvent(Event eventToUpdate)
        {
            _context.Events.Update(eventToUpdate);
            eventToUpdate.Version = Guid.NewGuid();
            await _context.SaveChangesAsync();
            return await _context.Events.FindAsync(eventToUpdate.Id);
        }


        public async Task<Event?> ForceUpdateEvent(Event eventToUpdate)
        {
            // Detach any local tracked entity to avoid issues
            var local = _context.Set<Event>()
                .Local
                .FirstOrDefault(entry => entry.Id.Equals(eventToUpdate.Id));

            if (local != null)
            {
                _context.Entry(local).State = EntityState.Detached;
            }

            // Retrieve the current values from the database
            var currentValues = await _context.Events
                .AsNoTracking()
                .FirstOrDefaultAsync(e => e.Id == eventToUpdate.Id);

            if (currentValues == null)
            {
                throw new KeyNotFoundException("Event not found.");
            }

            // Attach the entity to the context
            _context.Events.Attach(eventToUpdate);

            // Set the original value of the Version property to the current value in the database
            _context.Entry(eventToUpdate).Property(e => e.Version).OriginalValue = currentValues.Version;

            // Set a new Version value for the update
            eventToUpdate.Version = Guid.NewGuid();

            // Mark all properties as modified except the Id
            foreach (var property in _context.Entry(eventToUpdate).Properties)
            {
                if (property.Metadata.Name != nameof(eventToUpdate.Id))
                {
                    property.IsModified = true;
                }
            }

            // Save changes
            await _context.SaveChangesAsync();
            return eventToUpdate;

        }


        public async Task<IEnumerable<Event>> SearchEventsAsync(string? name, EventType? type, DateTime? startDate, DateTime? endDate,
        TimeSpan? startTime, TimeSpan? endTime, string? location, float? minBudget, float? maxBudget,
        string? categories, string? paymentMethods, string userId, float? minTicketPrice, float? maxTicketPrice,
        string? description, string? hashtags)
        {
            var query = _context.Events.AsQueryable();

            if (!string.IsNullOrEmpty(name))
            {
                query = query.Where(e => e.Name.Contains(name));
            }

            if (type.HasValue)
            {
                query = query.Where(e => e.Type == type.Value);
            }

            if (startDate.HasValue)
            {
                query = query.Where(e => e.Date >= startDate.Value);
            }

            if (endDate.HasValue)
            {
                query = query.Where(e => e.Date <= endDate.Value);
            }

            if (!string.IsNullOrEmpty(location))
            {
                query = query.Where(e => e.Location.Contains(location));
            }

            if (minBudget.HasValue)
            {
                query = query.Where(e => e.Budget >= minBudget.Value);
            }

            if (maxBudget.HasValue)
            {
                query = query.Where(e => e.Budget <= maxBudget.Value);
            }


            if (!string.IsNullOrEmpty(userId))
            {
                query = query.Where(e => e.UserId == userId);
            }

            if (minTicketPrice.HasValue)
            {
                query = query.Where(e => e.TicketPrice >= minTicketPrice.Value);
            }

            if (maxTicketPrice.HasValue)
            {
                query = query.Where(e => e.TicketPrice <= maxTicketPrice.Value);
            }

            if (!string.IsNullOrEmpty(description))
            {
                query = query.Where(e => e.Description.Contains(description));
            }

            if (!string.IsNullOrEmpty(hashtags))
            {
                query = query.Where(e =>  e.Hashtags.Contains(hashtags));
            }

            // Bring data into memory for TimeSpan comparisons
            var events = await query.ToListAsync();

            if (startTime.HasValue)
            {
                events = events.Where(e => e.StartTime >= startTime.Value).ToList();
            }

            if (endTime.HasValue)
            {
                events = events.Where(e => e.EndTime <= endTime.Value).ToList();
            }

            if (!string.IsNullOrEmpty(categories))
            {
                var categoryList = categories.Split(',', StringSplitOptions.RemoveEmptyEntries)
                                             .Select(c => Enum.Parse<EventCategory>(c.Trim()))
                                             .ToList();
                events = events.Where(e => categoryList.All(c => e.Categories.Contains(c))).ToList();
            }

            if (!string.IsNullOrEmpty(paymentMethods))
            {
                var paymentMethodList = paymentMethods.Split(',', StringSplitOptions.RemoveEmptyEntries)
                                                      .Select(p => Enum.Parse<PaymentMethod>(p.Trim()))
                                                      .ToList();
                events = events.Where(e => paymentMethodList.All(p => e.AllowedPaymentMethods.Contains(p))).ToList();
            }

            return events;
        
        }

        public async Task<IEnumerable<Event>> OptimisticSearchAsync(string searchValue)
        {
            if (string.IsNullOrEmpty(searchValue))
            {
                return await _context.Events.ToListAsync();
            }

            var searchLower = searchValue.ToLower();
            var query = _context.Events.AsQueryable();

            // Build the query dynamically
            query = query.Where(e =>
                e.Name.ToLower().Contains(searchLower) ||
                e.Location.ToLower().Contains(searchLower) ||
                e.Description.ToLower().Contains(searchLower) ||
                e.Hashtags.ToLower().Contains(searchLower) ||
                EF.Functions.Like(e.TicketPrice.ToString(), $"%{searchLower}%") ||
                EF.Functions.Like(e.Budget.ToString(), $"%{searchLower}%"));

            var events = await query.ToListAsync();

            return events;
        }
    }
}
