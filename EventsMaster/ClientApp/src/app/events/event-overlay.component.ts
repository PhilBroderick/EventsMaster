import { Component, Input, Inject, HostListener} from '@angular/core';
import { trigger, state, style, transition, animate, AnimationEvent, group, query } from '@angular/animations';

import { EVENT_DIALOG_DATA } from "./event-overlay.tokens";
import { EventOverlayRef } from './event-overlay-ref';
import { LoginComponent } from '../login/login.component';

const ANIMATION_TIMINGS = '400ms cubic-bezier(0.25, 0.8, 0.25, 1)';
const ESCAPE = 27;

@Component({
  selector: 'event-overlay',
  template: `
    <div class="overlay-content">
      <p>{{event.name}}</p>
      <p>{{event.description}}</p>
      <button (click)="console()">Book tickets</button>
    </div>
`,
  styles: [`
    :host {
      display: block;
      background: white;
    }

    h1 {
      margin: 0;
      padding: 1em;
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
    @Inject(EVENT_DIALOG_DATA) public event: any) { }

  console() {
    this.dialogRef.console();
  }
}
