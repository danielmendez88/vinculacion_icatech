import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// importar componente
import { DashboardComponent } from './dashboard.component';
// declarando el modulo anterior
import { StatModuleModule } from '../../shared/stat-module.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StatModuleModule
  ]
})
export class DashboardModule { }
