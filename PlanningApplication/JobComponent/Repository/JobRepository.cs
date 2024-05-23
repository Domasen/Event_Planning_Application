using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PlanningApplication.Data;
using PlanningApplication.EmployeeComponent.Models;
using PlanningApplication.UsersComponent.Models;

namespace PlanningApplication.JobComponent.Models
{
    public class JobRepository : IJobRepository
    {
        private readonly ApplicationDbContext _context;
        public JobRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Job?> Create(Job job)
        {
            await _context.Jobs.AddAsync(job);
            await _context.SaveChangesAsync();
            return job;
        }

        public async Task<Job?> Delete(Job job)
        {
            _context.Jobs.Remove(job);
            await _context.SaveChangesAsync();
            return job;
        }

        public async Task<IEnumerable<Job>> GetAll()
        {
            return await _context.Jobs.Include(x => x.assignedEmployees).Include(x => x.plannedEvent).ToListAsync();
        }

        public async Task<IEnumerable<Job>> GetAllByEvent(Event heldEvent)
        {
            return (await GetAll()).Where(x => x.plannedEvent.Id == heldEvent.Id);
        }

        public async Task<Job?> GetById(Guid id)
        {
            return (await GetAll()).Where(x => x.Id == id).First();
        }

        public async Task<Job?> Update(Job job)
        {
            var result = await GetById(job.Id);
            result.HoursPlanned = job.HoursPlanned;
            result.assignedEmployees = job.assignedEmployees;
            result.Name = job.Name;
            await _context.SaveChangesAsync();
            return result;
        }
    }
}