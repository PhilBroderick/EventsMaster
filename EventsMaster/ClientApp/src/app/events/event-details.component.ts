import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from '../shared/models/event.model';
import { EventService } from '../core/event.service';

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

  constructor(private route: ActivatedRoute, private eventService: EventService) { }

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


}
