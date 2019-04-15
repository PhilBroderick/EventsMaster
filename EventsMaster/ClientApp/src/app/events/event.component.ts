import { Component, OnInit } from "@angular/core";

import { Event } from "../shared/models/event.model";
import { EventService } from "../core/event.service";
import { EventOverlayService } from "../core/event-overlay.service";

@Component({
  selector: 'app-events',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventsComponent implements OnInit {
  events: Array<Event>
  addingEvent = false;
  selectedEvent: Event;
  deleteButtonSelected = false;

  constructor(private eventService: EventService, private previewDialog: EventOverlayService) { }

  ngOnInit() {
    this.getEvents();
  }

  showPreview() {
    this.previewDialog.open();
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
        this.events.push(event);
      })
    } else {
      this.eventService.updateEvent(this.selectedEvent).subscribe(event => {
        this.addingEvent = false;
        this.selectedEvent = null;
      })
    }
  }

  deleteEvent(event: Event) {
    this.deleteButtonSelected = true;
    let value: boolean;
    value = confirm("Are you sure you want to delete this event?");
    if (value != true) {
      return;
    }
    this.eventService.deleteEvent(event).subscribe(res => {
      this.events = this.events.filter(e => e !== event);
      if (this.selectedEvent === event) {
        this.selectedEvent = null;
      }
    })
  }

  onSelect(event: Event) {
    if (this.deleteButtonSelected == false) {
      this.addingEvent = false;
      this.selectedEvent = event;
    }
    this.deleteButtonSelected = false;
  }
}
