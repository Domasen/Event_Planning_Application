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

    public async Task<User?> UpdateUser(UserDto user)
    {
        var userToUpdate = await _context.Users.FindAsync(user.Id.ToString());

        if (userToUpdate != null)
        {
            userToUpdate.Email = user.Email;
            userToUpdate.Name = user.Name;
            userToUpdate.Surname = user.Surname;
            userToUpdate.PhoneNumber = user.Phone;
            userToUpdate.DateOfBirth = user.DateOfBirth;
        }

        await _context.SaveChangesAsync();

        return userToUpdate;
    }
}