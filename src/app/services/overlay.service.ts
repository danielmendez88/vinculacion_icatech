import { Injectable, TemplateRef, ViewContainerRef } from '@angular/core';
import { Overlay, PositionStrategy, OverlayRef, OverlayConfig } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {

  constructor(private overlay: Overlay) { }

  /**
   * TODO: nuevos metodos en el servicio overlay
   */
  createOverlay(config: AppOverlayConfig): OverlayRef {
    return this.overlay.create(config);
  }

  positionGloballyCenter(): PositionStrategy {
    return this.overlay.position()
            .global()
            .centerHorizontally()
            .centerVertically();
  }

  attachTemplatePortal(overlayRef: OverlayRef, templateRef: TemplateRef<any>, vcRef: ViewContainerRef) {
    const templatePortal = new TemplatePortal(templateRef, vcRef);
    overlayRef.attach(templatePortal);
  }
}

export interface AppOverlayConfig extends OverlayConfig {
  height?: number;
  width?: number;
}
