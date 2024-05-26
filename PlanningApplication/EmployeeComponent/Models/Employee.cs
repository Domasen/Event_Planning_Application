using PlanningApplication.ExpenseComponent.Models;
using PlanningApplication.JobComponent.Models;
using PlanningApplication.UsersComponent.Models;
using System.ComponentModel.DataAnnotations;

namespace PlanningApplication.EmployeeComponent.Models
{
    public class Employee
    {
        public User User { get; set; }
        public Guid Id { get; set; }
        public string Position { get; set; }
        public string Email { get; set; }
        public List<Job> Jobs { get; set; }
        public List<Expense> AssignedExpenses { get; set; }
        public decimal? HourlyPay { get; set; }
    }
}