import { Component, OnInit } from "@angular/core";

import { Event } from "../shared/models/event.model";
import { EventService } from "../core/event.service";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html'
})
export class EventsComponent implements OnInit {
  addingEvent = false;
  deleteButtonSelected = false;
  events: any = [];
  selectedEvent: Event;

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.getEvents();
  }

  cancel() {
    this.addingEvent = false;
    this.selectedEvent = null;
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

  onSelect(event: Event) {
    if (this.deleteButtonSelected == false) {
      this.addingEvent = false;
      this.selectedEvent = event;
    }
    this.deleteButtonSelected = false;
  }
  
}
