using PlanningApplication.JobComponent.Models;
using PlanningApplication.UsersComponent.Models;

namespace PlanningApplication.EmployeeComponent.Models
{
    public class Employee
    {
        public User User { get; set; }
        public Guid Id { get; set; } // Čia yra truputi klausimas kaip tiksliai implementuoti šitą, nes matau kelis sprendimus 
                                     // 1) Kaip dabar yra kode, kad Employee turi User, nes Employees turėtų turėti savo accounts tai ar taip ar taip turi turėti user + Id individualiai darbo vietai, bet dar klausimas, koks turėtų būti šito Id tipas.
                                     //     1.1) Guid - paprastas bus visur kitur naudojamas ir lengvai kontroliuojamas
                                     //     1.2) String - nes čia individualiams renginiams skirtas id, renginio organizatorius gali norėti sukurti custom id, kad lengvai galėtų matyti pareigas pvz. SH-123 (Stage Hand 123)
                                     // 2) Tiesiog turėti User ir neturėti antrinio id
        public Guid EventId { get; set; }
        public List<Job> Jobs { get; set; }
        public decimal? HourlyPay { get; set; }
    }
}
