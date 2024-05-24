using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using PlanningApplication.Data;
using PlanningApplication.UsersComponent.Models;
using PlanningApplication.UsersComponent.Services;
using PlanningApplication.Interceptors;


namespace PlanningApplication.UsersComponent.Controllers;
[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    
    private readonly ILogger<UserController> _logger;
    private readonly IUserServices _userServices;
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;
    public UserController(ILogger<UserController> logger, IUserServices userServices, UserManager<User> userManager, SignInManager<User> signInManager)
    {
        _logger = logger;
        _userServices = userServices;
        _userManager = userManager;
        _signInManager = signInManager;
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
    
    [HttpPost("register")]
    public async Task<ActionResult> Register([FromBody]RegisterDto registerDto)
    {
        var result = await _userServices.RegisterUser(registerDto);
        if (result.Succeeded) return Ok("User registered successfully");
        return BadRequest(result.Errors);
    }

    [HttpPost("login")]
    [LogAction]
    public async Task<ActionResult> Login(LoginDto loginDto)
    {

        var result = await _userServices.LoginUser(loginDto);
        if (result.Succeeded) return Ok(result);
        return Unauthorized("Invalid login attempt");
    }
    

    [HttpPost("logout")]
    [LogAction]
    public async Task<ActionResult> Logout()
    {
        await _userServices.LogoutUser();
        return Ok("Logout successful");
    }

    [Authorize]
    [HttpGet("currentUser")]
    public async Task<ActionResult<UserDto>> GetCurrentUser()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var user = await _userManager.FindByIdAsync(userId);

        if (user == null)
        {
            return Unauthorized();
        }

        var userDto = new UserDto
        {
            Id = Guid.Parse(userId),
            Email = user.Email,
            Name = user.Name,
            Surname = user.Surname
        };

        return Ok(userDto);
    }
    
    [HttpGet("current")]
    public async Task<String> GetCurrent()
    {
        var user = _signInManager.Context.User;
        var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);
        //var userName = user.Identity.Name;

        return userId;
    }

}