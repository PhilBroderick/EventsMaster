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

  constructor(private route: ActivatedRoute, private eventService: EventService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.eventId = params.get("eventId");
      this.category = params.get("eventCategory");
      if (this.eventId !== null) {
        console.log(this.eventId);
        console.log(this.category);
        this.eventService.getEvent(this.eventId, this.category).subscribe(event => {
          console.log("here");
          this.event = event;
          console.log(event);
        })
      }
    })
  }


}
