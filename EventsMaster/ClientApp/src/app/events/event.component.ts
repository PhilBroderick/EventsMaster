import { Component, OnInit } from "@angular/core";

import { Event } from "../shared/models/event.model";
import { EventService } from "../core/event.service";

@Component({
  selector: 'app-events',
  templateUrl: './event.component.html'
})
export class EventsComponent implements OnInit {
  events: Array<Event>
  addingEvent = false;
  selectedEvent: Event;

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.getEvents();
  }

  getEvents() {
    return this.eventService.getEvents().subscribe(events => {
      this.events = events;
    });
  }

  enableAddMode() {
    this.addingEvent = true;
    this.selectedEvent = new Event();
  }

  save() {
    if (this.addingEvent) {
      this.eventService.createEvent(this.selectedEvent).subscribe(event => {
        this.addingEvent = false;
        this.selectedEvent = null;
      })
    }
  }
}
