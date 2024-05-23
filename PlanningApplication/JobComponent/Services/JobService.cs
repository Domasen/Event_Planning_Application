using PlanningApplication.EmployeeComponent.Models;
using PlanningApplication.EmployeeComponent.Repository;
using PlanningApplication.UsersComponent.Models;
using PlanningApplication.UsersComponent.Repository;
using System.Runtime.InteropServices;

namespace PlanningApplication.JobComponent.Models;

public class JobService : IJobService
{
    private readonly IJobRepository _jobRepository;
    private readonly IEmployeeRepository _employeeRepository;

    public JobService(IJobRepository jobRepository, IEmployeeRepository employeeRepository)
    {
        _jobRepository = jobRepository;
        _employeeRepository = employeeRepository;
    }

    public async Task<Job?> Create(JobDto job)
    {
        Job jobModel = new Job()
        {
            Id = Guid.NewGuid(),
            HoursPlanned = int.Parse(job.HoursPlanned),
            assignedEmployees = (await _employeeRepository.GetAll()).Where(x => x.Email == job.AssignedEmployee).ToList(),
            Name = job.JobName,
            plannedEvent = job.plannedEvent

        };
        Job? jobObject = await _jobRepository.Create(jobModel);
        return jobObject;
    }

    public async Task<Job?> Delete(Job job)
    {
        return await _jobRepository.Delete(job);
    }

    public async Task<IEnumerable<Job>> GetAll()
    {
        return await _jobRepository.GetAll();
    }

    public async Task<Job?> GetById(Guid jobId)
    {
        return await _jobRepository.GetById(jobId);
    }

    public async Task<Job?> Update(Job job)
    {
        return await _jobRepository.Update(job);
    }
}