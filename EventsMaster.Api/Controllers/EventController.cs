using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EventsMaster.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;

namespace EventsMaster.Api.Controllers
{
    [Route("events")]
    [ApiController]
    public class EventController : ControllerBase
    {
        readonly IConfiguration _configuration = null;

        public EventController(IConfiguration config)
        {
            _configuration = config;
        }

        [HttpGet, Route("")]
        [Produces("application/json")]
        public async Task<IActionResult> GetAllEventsAsync()
        {
            var events = await DocumentDBRepository<Event>.GetItemsAsync();
            return Ok(events);
        }

        [HttpGet, Route("{id}/{category}")]
        [Produces("application/json")]
        public async Task<IActionResult> GetEventByIdAsync(string id, string category)
        {
            var singleEvent = await DocumentDBRepository<Event>.GetItemAsync(id, category);
            return Ok(singleEvent);
        }

        [HttpGet, Route("{id}/{category}/image")]
        [Produces("application/json")]
        public async Task<IActionResult> GetImageByEventAsync(string id, string category)
        {
            var singleEvent = await DocumentDBRepository<Event>.GetItemAsync(id, category);
            return Ok(new { dataUri = singleEvent.ImageUrl} );

        }

        [HttpPost, Route("")]
        public async Task<IActionResult> CreateEventAsync([FromBody] Event singleEvent)
        {
            if (ModelState.IsValid)
            {
                singleEvent.Id = Guid.NewGuid().ToString();
                singleEvent.SeatsAvailable = new List<Seat>();
                singleEvent.SeatsBooked = new List<Seat>();
                await DocumentDBRepository<Event>.CreateItemAsync(singleEvent);
                return Ok(singleEvent);
            }
            return null;
        }

        [HttpDelete, Route("{id}/{category}")]
        public async Task<IActionResult> DeleteEventAsync(string id, string category)
        {
            try
            {
                var categoryToUpper = CategoryToUpper(category);
                var singleEvent = await DocumentDBRepository<Event>.GetSingleItemAsync(d => d.Id == id && d.Category == categoryToUpper);
                if (singleEvent == null)
                    return NotFound();
                await DocumentDBRepository<Event>.DeleteItemAsync(singleEvent.Id, singleEvent.Category);
                return Ok();
            }
            catch (Exception ex)
            {
                var error = new
                {
                    message = ex.ToString(),
                    status = StatusCodes.Status500InternalServerError
                };
                return new ObjectResult(error);
            }
        }

        [HttpPut, Route("{id}/{category}")]
        [Produces("application/json")]
        [Consumes("application/json")]
        public async Task<IActionResult> UpdateEventAsync(string id, string category, [FromBody] Event singleEvent)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var categoryToUpper = CategoryToUpper(category);
                    singleEvent.TotalTicketsSold = CalculateTotalTicketsSold(singleEvent);
                    var updateEvent = await DocumentDBRepository<Event>.GetSingleItemAsync(d => d.Id == id && d.Category == categoryToUpper);
                    if (updateEvent == null)
                        return NotFound();
                    await DocumentDBRepository<Event>.UpdateItemAsync(updateEvent.Id, singleEvent);
                    return Ok(singleEvent);
                }
                return NotFound();
            }
            catch (Exception ex)
            {
                var error = new
                {
                    message = ex.ToString(),
                    status = StatusCodes.Status500InternalServerError
                };
                return new ObjectResult(error);
            }
        }

        [HttpGet, Route("{id}/{category}/seatsAvailable")]
        [Produces("application/json")]
        public async Task<IActionResult> GetAvailableTicketsAsyc(string id, string category)
        {
            var evt = await DocumentDBRepository<Event>.GetItemAsync(id, category);
            if (evt == null)
                return NotFound();
            return Ok(new { seatsAvailable = evt.SeatsAvailable });
        }

        [HttpPut, Route("{id}/{category}/book")]
        [Produces("application/json")]
        [Consumes("application/json")]
        public async Task<IActionResult> BookTicketsAsync(string id, string category, [FromBody] RootObject seatList)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var eventToUpdate = await DocumentDBRepository<Event>.GetSingleItemAsync(d => d.Id == id && d.Category == category);
                    if (eventToUpdate == null)
                        return NotFound();

                    if (eventToUpdate.SeatsAvailable == null)
                        eventToUpdate.SeatsAvailable = new List<Seat>();

                    if (eventToUpdate.SeatsBooked == null)
                        eventToUpdate.SeatsBooked = new List<Seat>();

                    BookEventSeats(seatList, seatList.standing, eventToUpdate);
                    await DocumentDBRepository<Event>.UpdateItemAsync(eventToUpdate.Id, eventToUpdate);
                    return Ok(eventToUpdate);
                }
                return NotFound();
            }
            catch(Exception ex)
            {
                var error = new
                {
                    message = ex.ToString(),
                    status = StatusCodes.Status500InternalServerError
                };
                return new ObjectResult(error);
            }
        }

        private static void BookEventSeats(RootObject seatList, int? standing, Event eventToUpdate)
        {
            foreach (var seat in seatList.seats)
            {
                seat.IsBooked = true;
            }
            eventToUpdate.SeatsBooked.AddRange(seatList.seats);
            foreach (var seat in seatList.seats)
            {
                eventToUpdate.SeatsAvailable.Remove(seat);
            }
            if (standing.HasValue)
            {
                eventToUpdate.Standing += standing.GetValueOrDefault();
            }
        }

        private int CalculateTotalTicketsSold(Event singleEvent)
        {
            var totalTickets = 0;

            foreach (var userTickets in singleEvent.UserTickets)
            {
                totalTickets += userTickets.TicketsPurchased;    
            }
            return totalTickets;
        }

        private string CategoryToUpper(string lowerCategory)
        {
            return lowerCategory.First().ToString().ToUpper() + lowerCategory.Substring(1);
        }
    }
}