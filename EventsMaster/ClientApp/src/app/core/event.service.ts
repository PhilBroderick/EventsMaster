import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Http, Response } from '@angular/http';

import { Event } from "../shared/models/event.model";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

  const api = 'http://localhost:51404'

@Injectable()
export class EventService {


  constructor(private http: HttpClient) { }

  getEvents() : Observable<Event[]> {
    return this.http.get<Array<Event>>('http://localhost:51404/events');
  }
  
}
