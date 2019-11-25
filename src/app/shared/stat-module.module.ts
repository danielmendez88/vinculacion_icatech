import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// componente
import { SharedComponent } from './shared.component';
// importar los componentes de material
import { MatCardModule, MatIconModule  } from '@angular/material';
import { StatComponent } from './stat/stat.component';
// importar componente de vinculadores

@NgModule({
  declarations: [
    SharedComponent,
    StatComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
  ],
  exports: [
    SharedComponent,
    StatComponent
  ]
})
export class StatModuleModule { }
