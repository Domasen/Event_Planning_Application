using PlanningApplication.EmployeeComponent.Models;
using PlanningApplication.UsersComponent.Models;

namespace PlanningApplication.JobComponent.Models;

public interface IJobService
{
    public Task<Job?> Create(JobDto job);
    public Task<Job?> Delete(Job job);
    public Task<Job?> GetById(Guid job);
    public Task<IEnumerable<Job>> GetAll();
    public Task<Job?> Update(Job job);
}