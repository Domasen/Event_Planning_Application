using Microsoft.AspNetCore.Identity;
using PlanningApplication.UsersComponent.Models;

namespace PlanningApplication.UsersComponent.Services;

public interface IUserServices
{
    Task<User> AddUser(UserDto user);
    Task<User?> DeleteUser(Guid userId);
    Task<User?> GetUser(Guid userId);
    Task<IEnumerable<User>> GetUsers();
    Task<User?> UpdateUser(UserDto user);
    Task<IdentityResult> RegisterUser(RegisterDto registerDto);
    Task<SignInResult> LoginUser(LoginDto loginDto);
    Task LogoutUser();
    public Task<User?> UploadUserPhoto(Guid Id, byte[] image);
}