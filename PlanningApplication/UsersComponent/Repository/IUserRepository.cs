using PlanningApplication.UsersComponent.Models;

namespace PlanningApplication.UsersComponent.Repository;

public interface IUserRepository
{
    Task<User> AddUser(User user);
    Task<User?> DeleteUser(Guid userId);
    Task<User?> GetCustomer(Guid userId);
    Task<IEnumerable<User>> GetUsers();
    Task<User?> UpdateUser(User user);

}