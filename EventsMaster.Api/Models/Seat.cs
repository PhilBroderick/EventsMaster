using Newtonsoft.Json;

namespace EventsMaster.Api
{
    public class Seat
    {
        [JsonProperty(PropertyName = "seatId")]
        public int SeatId { get; set; }
        [JsonProperty(PropertyName = "isBooked")]
        public bool IsBooked { get; set; }
    }
}