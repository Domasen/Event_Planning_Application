﻿using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;
using PlanningApplication.EventComponent.Models;

namespace PlanningApplication.UsersComponent.Models;

public class User : IdentityUser
{
    [Key]
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Surname { get; set; }
    public DateTime? DateOfBirth { get; set; }
    public byte[]? Photo { get; set; }
    public ICollection<Event> Events { get; set; } = new List<Event>();
}