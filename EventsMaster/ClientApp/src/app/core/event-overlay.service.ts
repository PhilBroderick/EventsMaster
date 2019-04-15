import { Injectable } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { EventOverlayComponent } from '../events/event-overlay.component';

@Injectable()
export class EventOverlayService {

  constructor(private overlay: Overlay) { }


  open() {

    const overlayRef = this.overlay.create();

    const eventPreviewPortal = new ComponentPortal(EventOverlayComponent);

    overlayRef.attach(eventPreviewPortal);
  }
}
