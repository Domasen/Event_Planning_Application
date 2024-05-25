using PlanningApplication.UsersComponent.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PlanningApplication.EventComponent.Models
{
    public class Event
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;
        
        public EventType Type { get; set; } = EventType.None;

        public float TicketPrice { get; set; } = 0;
        [Required]
        public  DateTime Date { get; set; }
        [Required]
        public TimeSpan StartTime { get; set; }

        public string Location { get; set; } = string.Empty;

        public TimeSpan EndTime { get; set; }

        public string Format { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public string Hashtags { get; set; } = string.Empty;

        public float Budget { get; set; } = 0;

        public List<EventCategory> Categories { get; set; } = new List<EventCategory>();

        public List<PaymentMethod> AllowedPaymentMethods { get; set; } = new List<PaymentMethod>();

        public string UserId { get; set; }
        public User User { get; set; }

        [ConcurrencyCheck]
        public Guid Version { get; set; }

    }
}
