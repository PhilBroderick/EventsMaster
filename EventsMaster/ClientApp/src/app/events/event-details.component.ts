import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from '../shared/models/event.model';
import { EventService } from '../core/event.service';
import * as $ from 'jquery';
import { LoginService } from '../core/login.service';

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

  constructor(private route: ActivatedRoute, private eventService: EventService, private loginService: LoginService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.eventId = params.get("eventId");
      this.category = params.get("eventCategory");
      if (this.eventId !== null) {
        this.eventService.getEvent(this.eventId, this.category).subscribe(event => {
          this.event = event;
          let totalTickets = parseFloat(this.event.tickets);
          console.log(totalTickets);
          let number = this.event.totalTicketsSold / totalTickets;
          if (this.event.totalTicketsSold < totalTickets && (this.event.totalTicketsSold / totalTickets) >= 0.9) {
            this.ticketsAvailable = true;
            this.lowTicketsLeft = true;
          } else if (this.event.totalTicketsSold < totalTickets && (this.event.totalTicketsSold / totalTickets) > 0.9) {
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

  }
}
