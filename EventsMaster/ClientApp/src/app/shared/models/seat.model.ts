export class Seat {
  seatId: string;
  isBooked: boolean;

  constructor(seatId: string, isBooked: boolean) {
    this.seatId = seatId;
    this.isBooked = isBooked;
  }
}
