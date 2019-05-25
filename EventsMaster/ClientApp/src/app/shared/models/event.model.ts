import { UserTickets } from "./userTickets-model";

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
}
