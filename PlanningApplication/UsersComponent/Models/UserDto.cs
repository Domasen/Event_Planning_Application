using PlanningApplication.EventComponent.Models;

namespace PlanningApplication.UsersComponent.Models;

public class UserDto
{
    public Guid Id { get; set; }
    public string Email { get; set; }
    public string Name { get; set; }
    public string Surname { get; set; }

}