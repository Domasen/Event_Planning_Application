using PlanningApplication.Data;
using PlanningApplication.EmployeeComponent.Models;
using PlanningApplication.EmployeeComponent.Repository;
using PlanningApplication.EventComponent.Models;
using PlanningApplication.EventComponent.Repository;
using PlanningApplication.UsersComponent.Models;
using PlanningApplication.UsersComponent.Repository;
using System.Runtime.InteropServices;
using System.Text.Json.Serialization.Metadata;

namespace PlanningApplication.JobComponent.Models;

public class JobService : IJobService
{
    private readonly IJobRepository _jobRepository;
    private readonly IEmployeeRepository _employeeRepository;
    private readonly IEventRepository _eventRepository;

    public JobService(IJobRepository jobRepository, IEmployeeRepository employeeRepository, IEventRepository eventRepository)
    {
        _jobRepository = jobRepository;
        _employeeRepository = employeeRepository;
        _eventRepository = eventRepository;
    }

    public async Task<Job?> Create(JobDto job)
    {
        Job jobModel = new Job()
        {
            Id = Guid.NewGuid(),
            HoursPlanned = int.Parse(job.HoursPlanned),
            assignedEmployees = (await _employeeRepository.GetAll()).Where(x => x.Id == Guid.Parse(job.AssignedEmployee)).First(),
            Name = job.JobName,
            plannedEvent = await _eventRepository.GetEvent(job.currentEvent)

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

    public async Task<IEnumerable<Job>> GetByEvent(Guid eventId)
    {
        return await _jobRepository.GetAllByEvent(eventId);
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