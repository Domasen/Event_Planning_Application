using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace PlanningApplication.UsersComponent.Models;

public class User : IdentityUser
{
    [Key]
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Surname { get; set; }

    //public string Email { get; set; }
    
}