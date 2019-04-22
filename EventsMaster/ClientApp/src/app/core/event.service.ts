import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Http, Response } from '@angular/http';

import { Event } from "../shared/models/event.model";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';


@Injectable()
export class EventService {


  constructor(private http: HttpClient) { }

  getEvents(): Observable<Event[]> {
    let token = localStorage.getItem("jwt");
    return this.http.get<Array<Event>>('https://eventsmasterapi.azurewebsites.net/events');
  }


  createEvent(event: Event) {
    return this.http.post<Event>('https://eventsmasterapi.azurewebsites.net/events', event);
  }

  getEvent(id: string, category: string) {
    return this.http.get<Event>('https://eventsmasterapi.azurewebsites.net/events?id=' + id + '/' + category);
  }

  updateEvent(event: Event) {
    return this.http.put<Event>('https://eventsmasterapi.azurewebsites.net/events/' + event.id + '/' + event.category, event);
  }

  deleteEvent(event: Event) {
    return this.http.delete<Event>('https://eventsmasterapi.azurewebsites.net/events/' + event.id + '/' + event.category);
  }
}
