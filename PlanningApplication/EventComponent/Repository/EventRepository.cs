using Microsoft.EntityFrameworkCore;
using PlanningApplication.Data;
using PlanningApplication.EventComponent.Models;

namespace PlanningApplication.EventComponent.Repository
{
    public class EventRepository : IEventRepository
    {
        private readonly ApplicationDbContext _context;

        public EventRepository(ApplicationDbContext context) {
            _context = context;
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
            eventToUpdate.Version =Guid.NewGuid();
            await _context.SaveChangesAsync(); 
            return await _context.Events.FindAsync(eventToUpdate.Id);
        }
    }
}
