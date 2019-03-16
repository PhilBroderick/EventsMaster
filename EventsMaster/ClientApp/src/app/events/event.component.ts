import { Component, OnInit } from "@angular/core";

import { Event } from "../shared/models/event.model";
import { EventService } from "../core/event.service";

@Component({
  selector: 'app-events',
  templateUrl: './event.component.html'
})
export class EventsComponent implements OnInit {
  events: Array<Event>

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.eventService.getEvents().subscribe(data => {
      this.events = data;
      //console.log("this.events=" this.events);
    })
  }
  
  
}
