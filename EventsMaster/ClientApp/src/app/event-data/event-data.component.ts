import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-event-data',
  templateUrl: './event-data.component.html'
})

export class EventDataComponent {
  public events: Events[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Events[]>(baseUrl + 'api/SampleEvent/Events').subscribe(result => {
      this.events = result;
    }, error => console.error(error));
  }
}

interface Events {
  name: string,
  eventDate: string,
  location: string
}
