using PlanningApplication.UsersComponent.Models;
using PlanningApplication.UsersComponent.Repository;

namespace PlanningApplication.UsersComponent.Services;

public class UserServices : IUserServices
{

    private readonly IUserRepository _userRepository;

    public UserServices(IUserRepository userRepository)
    {
        _userRepository = userRepository;
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

    public Task<User?> UpdateUser(User user)
    {
        throw new NotImplementedException();
    }
}