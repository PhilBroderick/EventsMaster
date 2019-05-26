using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EventsMaster.Api.Models;
using Newtonsoft.Json;

namespace EventsMaster.Api
{
    public class Event
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }
        [JsonProperty(PropertyName = "category")]
        public string Category { get; set; }
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }
        [JsonProperty(PropertyName = "description")]
        public string Description { get; set; }
        [JsonProperty(PropertyName = "tickets")]
        public string Tickets { get; set; }
        [JsonProperty(PropertyName = "imageUrl")]
        public string ImageUrl { get; set; }
        [JsonProperty(PropertyName ="userId")]
        public string UserId { get; set; }
        [JsonProperty(PropertyName ="attendees")]
        public List<string> Attendees { get; set; }
        [JsonProperty(PropertyName ="userTickets")]
        public List<UserTickets> UserTickets { get; set; }
        [JsonProperty(PropertyName = "totalTicketsSold")]
        public int TotalTicketsSold { get; set; }
        [JsonProperty(PropertyName = "seatsAvailable")]
        public List<Seat> SeatsAvailable { get; set; }
        [JsonProperty(PropertyName = "seatsBooked")]
        public List<Seat> SeatsBooked { get; set; }
        [JsonProperty(PropertyName = "standing")]
        public int Standing { get; set; }
    }
}