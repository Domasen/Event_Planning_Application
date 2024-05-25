using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using PlanningApplication.EventComponent.Models;

namespace PlanningApplication.EventComponent.Models
{
    public class EventDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }

        public EventType Type { get; set; }

        public float TicketPrice { get; set; }

        public DateTime Date { get; set; }

        public TimeSpan StartTime { get; set; }

        public TimeSpan EndTime { get; set; }

        public string Location { get; set; }

        public string Format { get; set; }

        public string Description { get; set; }

        public string Hashtags { get; set; }

        public float Budget { get; set; }

        public List<EventCategory> Categories { get; set; } = new List<EventCategory>();

        public List<PaymentMethod> AllowedPaymentMethods { get; set; } = new List<PaymentMethod>();

        public string UserId { get; set; }
        
        public byte[]? Photo { get; set; }

        public Guid Version {  get; set; }
    }
}
