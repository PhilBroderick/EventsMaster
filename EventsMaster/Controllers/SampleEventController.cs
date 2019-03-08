using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EventsMaster.Controllers
{
    [Route("api/[controller]")]
    public class SampleEventController : Controller
    {
        private static string[] EventNames = new[]
        {
            "21 Pilots", "Coldplay", "Ulster vs Leinster", "Ju Jitsu"
        };

        private static string[] Locations = new[]
        {
            "Belfast", "Manchester", "London", "Budapest", "Dublin", "Cork", "Edinburgh", "Leeds"
        };   

    [HttpGet("[action]")]
    public IEnumerable<Event> Events()
    {
        var rng = new Random();
        return Enumerable.Range(1, 5).Select(index => new Event
        {
            Name = EventNames[rng.Next(EventNames.Length)],
            Location = Locations[rng.Next(Locations.Length)],
            EventDate = DateTime.Now.AddDays(index).ToString("dd/MM/yyyy")
        });
    }
}   


    public class Event
    {
        public string Name { get; set; }
        public string Location { get; set; }
        public string EventDate { get; set; }

    }
}
