using EventsMaster.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace EventsMaster.Api.Controllers
{
    [RoutePrefix("events")]
    public class EventController : ApiController
    {
        [HttpGet, Route("")]
        public async Task<IHttpActionResult> GetAllEventsAsync()
        {
            var events = await DocumentDBRepository<Event>.GetItemsAsync();
            return Ok(events);
        }

        [HttpGet, Route("{id}/{category}")]
        public async Task<IHttpActionResult> GetEventByIdAsync(string id, string category)
        {
            var singleEvent = await DocumentDBRepository<Event>.GetItemAsync(id, category);
            return Ok(new { singleEvent });
        }

        [HttpPost, Route("")]
        public async Task<IHttpActionResult> CreateEventAsync([FromBody] Event singleEvent)
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
        public async Task<IHttpActionResult> DeleteEventAsync(string id, string category)
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
                return Content(HttpStatusCode.BadRequest, ex.ToString());
            }
        }

        [HttpPut, Route("{id}/{category}")]
        public async Task<IHttpActionResult> UpdateEventAsync(string id, string category, [FromBody] Event singleEvent)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var categoryToUpper = CategoryToUpper(category);
                    var updateEvent = await DocumentDBRepository<Event>.GetSingleItemAsync(d => d.Id == id && d.Category == categoryToUpper);
                    if (updateEvent == null)
                        return NotFound();
                    await DocumentDBRepository<Event>.UpdateItemAsync(updateEvent.Id, singleEvent);
                    return Ok(singleEvent);
                }
                return NotFound();
            }
            catch(Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex.ToString());
            }
        }

        private string CategoryToUpper(string lowerCategory)
        {
            return lowerCategory.First().ToString().ToUpper() + lowerCategory.Substring(1);
        }
    }
}
