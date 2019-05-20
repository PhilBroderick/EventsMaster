import { Component, Input, Inject, HostListener} from '@angular/core';
import { trigger, state, style, transition, animate, AnimationEvent, group, query } from '@angular/animations';

import { EVENT_DIALOG_DATA } from "./event-overlay.tokens";
import { EventOverlayRef } from './event-overlay-ref';
import { LoginComponent } from '../login/login.component';
import { LoginService } from '../core/login.service';
import { Event } from '@angular/router';
import { EventService } from '../core/event.service';

const ANIMATION_TIMINGS = '400ms cubic-bezier(0.25, 0.8, 0.25, 1)';
const ESCAPE = 27;

@Component({
  selector: 'event-overlay',
  templateUrl: './event-overlay.component.html',
  styleUrls: ['./event-overlay.component.css']
})

export class EventOverlayComponent {

  @HostListener('document:keydown', ['$event']) private handleKeydown(event: KeyboardEvent) {
    if (event.keyCode === ESCAPE) {
      this.dialogRef.close();
    }
  }

  constructor(
    public dialogRef: EventOverlayRef,
    public loginService: LoginService,
    private eventService: EventService,
    @Inject(EVENT_DIALOG_DATA) public event: any) { }
  
  updateEvent(event) {
    this.eventService.updateEvent(event).subscribe(event => {
      console.log("event updated " + event.name)
      this.dialogRef.close();
    });
  }
}
