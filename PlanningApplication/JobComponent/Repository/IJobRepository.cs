using PlanningApplication.Data;
using PlanningApplication.EmployeeComponent.Models;

namespace PlanningApplication.JobComponent.Models
{
    public interface IJobRepository
    {
        Task<Job?> GetById(Guid id);
        Task<IEnumerable<Job>> GetAll();
        Task<Job?> Update(Job job);
        Task<Job?> Delete(Job job);
        Task<Job?> Create(Job job);
        Task<IEnumerable<Job>> GetAllByEvent(Event heldEvent);
    }
}