import { Injectable, Inject, OnInit, Injector, ComponentRef } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';

import { EventOverlayComponent } from '../events/event-overlay.component';
import { EventOverlayRef } from '../events/event-overlay-ref';
import { EVENT_DIALOG_DATA } from '../events/event-overlay.tokens';

export interface Event {
  name: string;
  category: string;
  description: string;
  tickets: string;
}

interface EventOverlayConfig {
  panelClass?: string;
  hasBackdrop?: boolean;
  backdropClass?: string;
  event?: Event;
}

const DEFAULT_CONFIG: EventOverlayConfig = {
  hasBackdrop: true,
  backdropClass: 'dark-backdrop',
  panelClass: 'tm-event-preview-panel',
  event: null
}

@Injectable()
export class EventOverlayService {

  constructor(private injector: Injector, private overlay: Overlay) { }

  open(config: EventOverlayConfig = {}) {

    const dialogConfig = { ...DEFAULT_CONFIG, ...config };

    const overlayRef = this.createOverlay(dialogConfig);

    const dialogRef = new EventOverlayRef(overlayRef);

    const overlayComponent = this.attachDialogContainer(overlayRef, dialogConfig, dialogRef);

    overlayRef.backdropClick().subscribe(_ => dialogRef.close());

    return dialogRef;
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

  private attachDialogContainer(overlayRef: OverlayRef, config: EventOverlayConfig, dialogRef: EventOverlayRef) {
    const injector = this.createInjector(config, dialogRef);

    const containerPortal = new ComponentPortal(EventOverlayComponent, null, injector);
    const containerRef: ComponentRef<EventOverlayComponent> = overlayRef.attach(containerPortal);

    return containerRef.instance;
  }
  
  private createInjector(config: EventOverlayConfig, dialogRef: EventOverlayRef): PortalInjector {
    const injectionTokens = new WeakMap();

    injectionTokens.set(EventOverlayRef, dialogRef);
    injectionTokens.set(EVENT_DIALOG_DATA, config.event);

    return new PortalInjector(this.injector, injectionTokens);
  }
}
