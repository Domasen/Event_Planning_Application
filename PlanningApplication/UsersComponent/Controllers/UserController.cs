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
    
    [HttpPut("user")]
    [LogAction]
    public async Task<ActionResult> Update(UserDto userDto)
    {

        var result = await _userServices.UpdateUser(userDto);
        return Ok(result);
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
            Surname = user.Surname,
            DateOfBirth = user.DateOfBirth,
            Phone = user.PhoneNumber,
            Photo = user.Photo
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
    
    [HttpPost("uploadUserPhoto/{id}")]
    public async Task<IActionResult> UploadUserPhoto(Guid id, IFormFile photo)
    {
        if (photo == null || photo.Length == 0)
        {
            return BadRequest("Photo is null or empty.");
        }

        try
        {
            using (var memoryStream = new MemoryStream())
            {
                await photo.CopyToAsync(memoryStream);
                var photoBytes = memoryStream.ToArray();

                var Event = await _userServices.UploadUserPhoto(id, photoBytes);

                return Ok(Event);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error uploading photo.");
            return StatusCode(StatusCodes.Status500InternalServerError, "Error uploading photo.");
        }
    }

}