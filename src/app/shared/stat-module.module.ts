import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// componente
import { SharedComponent } from './shared.component';
// importar los componentes de material
import { MatCardModule, MatIconModule, MatProgressSpinnerModule,
  MatDatepickerModule, MatFormFieldModule, MatInputModule  } from '@angular/material';
import { StatComponent } from './stat/stat.component';
import { ProgressSpinnerComponent } from './progress-spinner/progress-spinner.component';
import { DatefilterComponent } from './datefilter/datefilter.component';
// importar componente de vinculadores
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// importar DatePipe
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    SharedComponent,
    StatComponent,
    ProgressSpinnerComponent,
    DatefilterComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    SharedComponent,
    StatComponent,
    ProgressSpinnerComponent,
    DatefilterComponent
  ],
  providers: [DatePipe]
})
export class StatModuleModule { }
