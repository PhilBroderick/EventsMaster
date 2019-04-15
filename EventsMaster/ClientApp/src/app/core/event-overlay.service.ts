import { Injectable } from '@angular/core';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { EventOverlayComponent } from '../events/event-overlay.component';

interface EventOverlayConfig {
  panelClass?: string;
  hasBackdrop?: boolean;
  backdropClass?: string;
}

const DEFAULT_CONFIG: EventOverlayConfig = {
  hasBackdrop: true,
  backdropClass: 'dark-backdrop',
  panelClass: 'tm-event-preview-panel'
}

@Injectable()
export class EventOverlayService {

  constructor(private overlay: Overlay) { }

  open(config: EventOverlayConfig = {}) {

    const dialogConfig = { ...DEFAULT_CONFIG, ...config };

    const overlayRef = this.createOverlay(dialogConfig);

    const eventPreviewPortal = new ComponentPortal(EventOverlayComponent);

    overlayRef.attach(eventPreviewPortal);
  }

  private getOverlayConfig(config: EventOverlayConfig): OverlayConfig {
    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const overlayConfig = new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy
    });

    return overlayConfig;
  }

  private createOverlay(config: EventOverlayConfig) {
    const overlayConfig = this.getOverlayConfig(config);

    return this.overlay.create(overlayConfig);
  }
}
