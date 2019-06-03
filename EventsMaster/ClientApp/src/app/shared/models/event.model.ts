import { UserTickets } from "./userTickets-model";
import { Seat } from "./seat.model";

export class Event {
  id: string;
  name: string;
  category: string;
  description: string;
  tickets: string;
  imageUrl: string;
  userId: string;
  attendees: Array<string>;
  userTickets: Array<UserTickets>;
  totalTicketsSold: number;
  seatsAvailable: Array<Seat>;
  seatsBooked: Array<Seat>;
  standing: number;
}
