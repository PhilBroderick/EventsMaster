import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from '../shared/models/event.model';
import { EventService } from '../core/event.service';
import * as $ from 'jquery';
import { LoginService } from '../core/login.service';
import { UserTickets } from '../shared/models/userTickets-model';
import { Seat } from '../shared/models/seat.model';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})

export class EventDetailsComponent {

  eventId = null;
  event: Event;
  category = null;
  ticketsAvailable = false;
  lowTicketsLeft = false;
  ticketsToReserve = 0;

  constructor(private route: ActivatedRoute, private eventService: EventService, private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.eventId = params.get("eventId");
      this.category = params.get("eventCategory");
      if (this.eventId !== null) {
        this.eventService.getEvent(this.eventId, this.category).subscribe(event => {
          this.event = event;
          let totalTickets = parseFloat(this.event.tickets);
          this.initializeTicketsAvailable(this.event.seatsAvailable);
          let number = this.event.totalTicketsSold / totalTickets;
          if (this.event.totalTicketsSold < totalTickets && (this.event.totalTicketsSold / totalTickets) >= 0.9) {
            this.ticketsAvailable = true;
            this.lowTicketsLeft = true;
          } else if (this.event.totalTicketsSold < totalTickets && (this.event.totalTicketsSold / totalTickets) > 0.9) {
            this.ticketsAvailable = true;
          } else {
            this.ticketsAvailable = true;
          }
        })
      }
    })
  }

  subtractTicket() {
    if (this.ticketsToReserve == 0) {
      return;
    } else {
      this.ticketsToReserve -= 1;
      $('.error-container p').text('');
      $('#ticketTotal').text(this.ticketsToReserve);
    }
  }

  addTicket() {
    let ticketNum = parseFloat(this.event.tickets);
    let ticketsLeft = ticketNum - this.event.totalTicketsSold;

    if (this.ticketsToReserve == 10 || this.ticketsToReserve >= ticketsLeft) {
      $('.error-container p').text("This is the maximum amount of tickets that can be purchased for this event!");
      return;
    } else {
      this.ticketsToReserve += 1;
      $('.error-container p').text('');
      $('#ticketTotal').text(this.ticketsToReserve);
    }
  }

  bookTickets() {
    if (!this.loginService.isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    } else {
      this.event.attendees.push(this.loginService.currentUserId);
      this.event.userTickets.push(new UserTickets(this.loginService.currentUserId, this.ticketsToReserve));
      this.eventService.updateEvent(this.event).subscribe(event => {
        this.event = event;
        $('.error-container p').text("Tickets successfully booked - you will receive an email shortly with the details");
      })
    }
  }

  initializeTicketsAvailable(seatsAvailabe: Array<Seat>) {
    let $seatContainer = $('.available-seats-container');
    seatsAvailabe.forEach(function (seat, index) {
      if ((index + 1) / 4 > 1) {
        console.log(index);
      } else {
        $seatContainer.append('<div class="seat-container"> <p>' + seat.seatId + '</p> <input type="checkbox" /> </div>');
      }
    })
  }
}
