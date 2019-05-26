export class UserTickets {
  userId: string;
  ticketsPurchased: number;
  constructor(userId: string, ticketsPurchased: number) {
    this.userId = userId;
    this.ticketsPurchased = ticketsPurchased;
  }
}
