import { OverlayRef } from '@angular/cdk/overlay';

export class EventOverlayRef {

  isEditable = false;

  constructor(private overlayRef: OverlayRef) { }

  close(): void {
    this.isEditable = false;
    this.overlayRef.dispose();
  }

  console(): void {
    alert("hello");
  }
}
