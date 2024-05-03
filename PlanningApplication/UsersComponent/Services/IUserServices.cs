using PlanningApplication.UsersComponent.Models;

namespace PlanningApplication.UsersComponent.Services;

public interface IUserServices
{
    Task<User> AddUser(UserDto user);
    Task<User?> DeleteUser(Guid userId);
    Task<User?> GetUser(Guid userId);
    Task<IEnumerable<User>> GetUsers();
    Task<User?> UpdateUser(User user);
}