import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// iconos
import {MatIconModule} from '@angular/material/icon';
// toolbar
import {MatToolbarModule} from '@angular/material/toolbar';
// menu
import {MatMenuModule} from '@angular/material/menu';
// sidenav
import {MatSidenavModule} from '@angular/material/sidenav';
// botones
import {MatButtonModule} from '@angular/material/button';
// divider
import {MatDividerModule} from '@angular/material/divider';
// lista
import {MatListModule} from '@angular/material/list';
// card
import {MatCardModule} from '@angular/material/card';
// formularios
import {MatFormFieldModule} from '@angular/material/form-field';
// stepper
import {MatStepperModule} from '@angular/material/stepper';
// datepicker
import {MatDatepickerModule} from '@angular/material/datepicker';
// selection
import {MatSelectModule} from '@angular/material/select';
// tabs
import {MatTabsModule} from '@angular/material/tabs';
// tooltip
import {MatTooltipModule} from '@angular/material/tooltip';
// radio
import {MatRadioModule} from '@angular/material/radio';
// snackbar
import {MatSnackBarModule} from '@angular/material/snack-bar';
// progress-spinner
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
// progress bar
import {MatProgressBarModule} from '@angular/material/progress-bar';
// tabla
import {MatTableModule} from '@angular/material/table';
// paginador
import {MatPaginatorModule} from '@angular/material/paginator';
// grid list
import {MatGridListModule} from '@angular/material/grid-list';
// slide toggle
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
// chips
import {MatChipsModule} from '@angular/material/chips';
// expansion
import {MatExpansionModule} from '@angular/material/expansion';
// bottom sheet
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
// dialogo
import {MatDialogModule} from '@angular/material/dialog';
// checkbox
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatSidenavModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatStepperModule,
    MatDatepickerModule,
    MatSelectModule,
    MatTabsModule,
    MatTooltipModule,
    MatRadioModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatGridListModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatExpansionModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatCheckboxModule
  ],
  exports: [
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatSidenavModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatStepperModule,
    MatDatepickerModule,
    MatSelectModule,
    MatTabsModule,
    MatTooltipModule,
    MatRadioModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatGridListModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatExpansionModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatCheckboxModule
  ]
})
export class MaterialModule {
  static forRoot(): any {
    throw new Error('Method not implemented.');
  }
}
