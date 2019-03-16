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
        public async Task<IHttpActionResult> GetAllEvents()
        {
            var events = await DocumentDBRepository<Event>.GetItemsAsync();
            return Ok(events);
        }

        [HttpGet, Route("{id}/{category}")]
        public async Task<IHttpActionResult> GetEventById(string id, string category)
        {
            var singleEvent = await DocumentDBRepository<Event>.GetItemAsync(id, category);
            return Ok(new { singleEvent });
        }
        
    }
}
