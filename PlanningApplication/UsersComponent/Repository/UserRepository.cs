using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PlanningApplication.Data;
using PlanningApplication.UsersComponent.Models;

namespace PlanningApplication.UsersComponent.Repository;

public class UserRepository : IUserRepository
{
    private readonly ApplicationDbContext _context;

    public UserRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public Task<User> AddUser(User user)
    {
        throw new NotImplementedException();
    }

    public Task<User?> DeleteUser(Guid userId)
    {
        throw new NotImplementedException();
    }

    public Task<User?> GetCustomer(Guid userId)
    {
        throw new NotImplementedException();
    }

    public async Task<IEnumerable<User>> GetUsers()
    {
        return await _context.Users.ToListAsync();
    }

    public Task<User?> UpdateUser(User user)
    {
        throw new NotImplementedException();
    }
}