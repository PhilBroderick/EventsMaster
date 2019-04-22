import { OverlayRef } from '@angular/cdk/overlay';

export class EventOverlayRef {

  constructor(private overlayRef: OverlayRef) { }

  close(): void {
    this.overlayRef.dispose();
  }
}
