using Microsoft.AspNetCore.Mvc;
using PlanningApplication.UsersComponent.Models;
using PlanningApplication.UsersComponent.Services;

namespace PlanningApplication.UsersComponent.Controllers;
[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    private readonly ILogger<UserController> _logger;
    private readonly IUserServices _userServices;
    public UserController(ILogger<UserController> logger, IUserServices userServices)
    {
        _logger = logger;
        _userServices = userServices;
    }

    [HttpGet("users")]
    public async Task<ActionResult<List<User>>> GetUsers()
    {
        try
        {
            return Ok(await _userServices.GetUsers());
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                "Error retrieving data from the database");
        }
    }

}