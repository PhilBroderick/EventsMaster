import { Component, Input, Inject } from '@angular/core';

import { EVENT_DIALOG_DATA } from "./event-overlay.tokens";
import { EventOverlayRef } from './event-overlay-ref';

@Component({
  selector: 'event-overlay',
  template: `
    <div class="overlay-content">
      <p>event.name</p>
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

  constructor(
    public dialogRef: EventOverlayRef,
    @Inject(EVENT_DIALOG_DATA) public event: any) { }
  
}
