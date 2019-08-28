import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// componente
import { SharedComponent } from './shared.component';
// importar los componentes de material
import { MatCardModule, MatIconModule  } from '@angular/material';

@NgModule({
  declarations: [SharedComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule
  ],
  exports: [
    SharedComponent
  ]
})
export class StatModuleModule { }
