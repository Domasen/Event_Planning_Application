using System.ComponentModel.DataAnnotations;

namespace PlanningApplication.UsersComponent.Models;

public class User
{
    [Key]
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Surname { get; set; }
}