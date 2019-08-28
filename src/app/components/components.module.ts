import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
// bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// navigation bar
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
// importando material
import { MaterialModule } from '../material/material.module';
// nav bar component
import { NavComponent } from './nav/nav.component';
// flex layout
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommandBarComponent } from './command-bar/command-bar.component';
import { RouterModule } from '@angular/router';
// servicio
import { NavserviceService } from '../services/navservice.service';

@NgModule({
  declarations: [FooterComponent,
    NavigationBarComponent,
    CommandBarComponent,
    NavComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule
  ],
  exports: [
    FooterComponent,
    NavigationBarComponent,
    CommandBarComponent,
    NavComponent
  ],
  providers: [NavserviceService]
})
export class ComponentsModule { }
