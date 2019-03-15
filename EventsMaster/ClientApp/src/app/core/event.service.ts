import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Event } from "../shared/models/event.model";

const api = 'http://localhost:51404';

@Injectable()
export class EventService {
  constructor(private http: HttpClient) { }

  getEvents() {
    return this.http.get<Array<Event>>('$ api}/events');
  }
}
