import { Component, OnInit, Input, ViewChild, TemplateRef, ViewContainerRef } from '@angular/core';
import { ThemePalette, ProgressSpinnerMode } from '@angular/material';
import { OverlayService, AppOverlayConfig } from '../../services/overlay.service';
import { OverlayRef } from '@angular/cdk/overlay';

@Component({
  selector: 'app-progress-spinner',
  templateUrl: './progress-spinner.component.html',
  styleUrls: ['./progress-spinner.component.scss']
})
export class ProgressSpinnerComponent implements OnInit {
  @Input() color?: ThemePalette;
  @Input() diameter = 100;
  @Input() mode?: ProgressSpinnerMode;
  @Input() value?: number;
  @Input() backdropEnabled = true;
  @Input() positionGloballyCenter = true;
  @Input() displayProgressSpinner: boolean;
  @Input() strokeWidth?: number;

  /**
   * @ViewChild
   */
  @ViewChild('progressSpinnerRef')
  private progressSpinnerRef: TemplateRef<any>;
  private progressSpinnerOverlayConfig: AppOverlayConfig;
  private overlayRef: OverlayRef;

  constructor(private vcRef: ViewContainerRef, private overlayService: OverlayService) { }

  ngOnInit() {
    // config for Overlay service
     // Config for Overlay Service
     this.progressSpinnerOverlayConfig = {
      hasBackdrop: this.backdropEnabled
    };
     if (this.positionGloballyCenter) {
      this.progressSpinnerOverlayConfig.positionStrategy = this.overlayService.positionGloballyCenter();
    }
    // Create Overlay for progress spinner
     this.overlayRef = this.overlayService.createOverlay(this.progressSpinnerOverlayConfig);

  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngDoCheck(): void {
    // tslint:disable-next-line:max-line-length
    // Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    // Add 'implements DoCheck' to the class.
    if (this.displayProgressSpinner && !this.overlayRef.hasAttached()) {
      this.overlayService.attachTemplatePortal(this.overlayRef, this.progressSpinnerRef, this.vcRef);
    } else if (!this.displayProgressSpinner && this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    }
  }

}
