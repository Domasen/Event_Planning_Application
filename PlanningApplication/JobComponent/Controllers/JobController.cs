using Microsoft.AspNetCore.Mvc;
using PlanningApplication.EmployeeComponent.Controllers;
using PlanningApplication.EmployeeComponent.Models;
using PlanningApplication.EmployeeComponent.Services;
using PlanningApplication.JobComponent.Models;

namespace PlanningApplication.JobComponent.Controllers;
[ApiController]
[Route("[controller]")]
public class JobController : ControllerBase
{
    private readonly ILogger<EmployeeController> _logger;
    private readonly IJobService _jobServices;
    public JobController(ILogger<EmployeeController> logger, IJobService jobServices)
    {
        _logger = logger;
        _jobServices = jobServices;
    }
    [HttpGet("GetAll")]
    public async Task<ActionResult<List<Job>>> GetAll()
    {
        try
        {
            return Ok(await _jobServices.GetAll());
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                "Error retrieving data from the database");
        }
    }
    [HttpDelete("Delete")]
    public async Task<ActionResult<Job?>> Delete(Job job)
    {
        try
        {
            return Ok(await _jobServices.Delete(job));
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                "Error retrieving data from the database");
        }
    }
    [HttpPut("Update")]
    public async Task<ActionResult<Job?>> Update(Job job)
    {
        try
        {
            return Ok(await _jobServices.Delete(job));
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                "Error retrieving data from the database");
        }
    }
    [HttpGet("GetById")]
    public async Task<ActionResult<Job?>> GetById(Guid id)
    {
        try
        {
            return Ok(await _jobServices.GetById(id));
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                "Error retrieving data from the database");
        }
    }
    [HttpPost("Create")]
    public async Task<ActionResult<Job?>> Create(JobDto jobDto)
    {
        try {
        
            return Ok(await _jobServices.Create(jobDto));
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                "Error retrieving data from the database");
        }
    }

}