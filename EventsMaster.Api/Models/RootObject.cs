using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EventsMaster.Api.Models
{
    public class RootObject
    {
        public List<Seat> seats { get; set; }
        public int? standing { get; set; }
    }
}
