using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using PlanningApplication.UsersComponent.Models;
using PlanningApplication.UsersComponent.Repository;

namespace PlanningApplication.UsersComponent.Services;

public class UserServices : IUserServices
{

    private readonly IUserRepository _userRepository;
    private readonly SignInManager<User> _signInManager;
    private readonly UserManager<User> _userManager;
    

    public UserServices(IUserRepository userRepository, SignInManager<User> signInManager, UserManager<User> userManager)
    {
        _userRepository = userRepository;
        _signInManager = signInManager;
        _userManager = userManager;
    }

    public async Task<IdentityResult> RegisterUser(RegisterDto registerDto)
    {
        var user = new User
        {
            UserName = registerDto.Email,
            Email = registerDto.Email,
            Name = registerDto.Name,
            Surname = registerDto.Surname
        };

        var result = await _userManager.CreateAsync(user, registerDto.Password);
        return result;
    }

    public async Task<SignInResult> LoginUser(LoginDto loginDto)
    {
        var user = await _userManager.FindByNameAsync(loginDto.Email);
        await _userManager.AddClaimAsync(user, new Claim("your-claim", "your-value"));
        var result = await _signInManager.PasswordSignInAsync(loginDto.Email, loginDto.Password, loginDto.RememberMe, false);
        return result;
    }

    public async Task LogoutUser()
    {
        await _signInManager.SignOutAsync();
    }
    public Task<User> AddUser(UserDto user)
    {
        throw new NotImplementedException();
    }

    public Task<User?> DeleteUser(Guid userId)
    {
        throw new NotImplementedException();
    }

    public Task<User?> GetUser(Guid userId)
    {
        throw new NotImplementedException();
    }

    public async Task<IEnumerable<User>> GetUsers()
    {
        return await _userRepository.GetUsers();
    }

    public async Task<User?> UpdateUser(UserDto user)
    {
        return await _userRepository.UpdateUser(user);
    }
}