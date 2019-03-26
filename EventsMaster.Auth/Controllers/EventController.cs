using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EventsMaster.Api.Models;
using EventsMaster.Api.Models.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Documents.Client;
using Microsoft.Extensions.Options;

namespace EventsMaster.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private readonly CosmosDBSettings _dbSettings;
        private DocumentDBRepository<Event> _dbContext;

        public EventController(IOptions<CosmosDBSettings> settings)
        {
            _dbSettings = settings.Value;
            _dbContext = new DocumentDBRepository<Event>("EventsMaster", "Event");
        }

        [HttpGet, Route("")]
        public async Task<IActionResult> GetAllEventsAsync()
        {
            var events = await _dbContext.GetItemsAsync();
            return Ok(events);
        }
    }
}