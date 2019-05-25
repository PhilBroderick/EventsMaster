﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
        IConfiguration _configuration = null;

        public EventController(IConfiguration config)
        {
            _configuration = config;
        }

        [HttpGet, Route("")]
        public async Task<IActionResult> GetAllEventsAsync()
        {
            var events = await DocumentDBRepository<Event>.GetItemsAsync();
            return Ok(events);
        }

        [HttpGet, Route("{id}/{category}")]
        public async Task<IActionResult> GetEventByIdAsync(string id, string category)
        {
            var singleEvent = await DocumentDBRepository<Event>.GetItemAsync(id, category);
            return Ok(singleEvent);
        }

        [HttpGet, Route("{id}/{category}/image")]
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
        public async Task<IActionResult> UpdateEventAsync(string id, string category, [FromBody] Event singleEvent)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var categoryToUpper = CategoryToUpper(category);
                    singleEvent.TotalTicketsSold = calculateTotalTicketsSold(singleEvent);
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

        private int calculateTotalTicketsSold(Event singleEvent)
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