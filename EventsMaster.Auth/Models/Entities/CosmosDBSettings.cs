using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EventsMaster.Api.Models.Entities
{
    public class CosmosDBSettings
    {
        public string EndpointUri { get; set; }
        public string PrimaryKey { get; set; }
    }
}
