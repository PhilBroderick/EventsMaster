import { Component, Input, Inject, HostListener} from '@angular/core';
import { trigger, state, style, transition, animate, AnimationEvent, group, query } from '@angular/animations';

import { EVENT_DIALOG_DATA } from "./event-overlay.tokens";
import { EventOverlayRef } from './event-overlay-ref';
import { LoginComponent } from '../login/login.component';
import { LoginService } from '../core/login.service';

const ANIMATION_TIMINGS = '400ms cubic-bezier(0.25, 0.8, 0.25, 1)';
const ESCAPE = 27;

@Component({
  selector: 'event-overlay',
  templateUrl: './event-overlay.component.html',
  styles: [`
    :host {
      display: block;
      background: white;
    }

    h1 {
      margin: 0;
      padding: 1em;
    }

    .book-button {
      font-size: 14px;
      font-family: Arial;
      color: white;
      background-color: #0be00b;
      border: none;
      padding: 5px 10px;
      border-radius: 4px;
      cursor: pointer;
  }
  `]
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
    @Inject(EVENT_DIALOG_DATA) public event: any) { }

  console() {
    this.dialogRef.console();
  }
}
