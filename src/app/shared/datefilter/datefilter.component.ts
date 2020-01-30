import { DatePipe } from '@angular/common';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material';
// importar datepipe
// importamos snackbar
import { SnackserviceService } from '../../services/snackservice.service';

@Component({
  selector: 'app-datefilter',
  templateUrl: './datefilter.component.html',
  styleUrls: ['./datefilter.component.scss']
})
export class DatefilterComponent implements OnInit {
  /**
   * TODO: variables del spinner
   */
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  displayProgressSpinner = false;
  spinnerWithoutBackdrop = false;
  /**
   * TODO: salida del componente child al componente parent
   */
  @Output() Fechas = new EventEmitter<any>();
  // @Output() FechaFin = new EventEmitter<Date>();
  /**
   * TODO: declaramos un objecto formGroup
   */
  frmGruopDate: FormGroup;
  constructor(
    private formB: FormBuilder,
    private datePipe: DatePipe,
    private sb: SnackserviceService
  ) {}

  ngOnInit() {
    // iniciamos el grupo del formulario
    this.frmGruopDate = this.formDate(this.formB);
  }

  formDate(fb: FormBuilder) {
    return fb.group({
      fechaInicio: new FormControl({value: '', disabled: true}, Validators.required ),
      fechaFin: new FormControl({value: '', disabled: true}, Validators.required )
    });
  }
  /**
   * TODO: function to get validate from dateInit to dateEnd
   */
  dateLessThan(from: string, to: string) {
    return (group: FormGroup): {[key: string]: any} => {
      const f = group.controls[from];
      const t = group.controls[to];
      if (f.value > t.value) {
        return {
          dates: 'Fecha inicial debe de ser menor a la fecha final.'
        };
      }
      return {};
    };
  }
  /**
   * TODO: get datepicker
   */
  get dateform() {
    return this.frmGruopDate.controls;
  }

  /**
   * TODO: funciones de eventos
   */
  addEvent = (event: MatDatepickerInputEvent<Date>) => {
    this.spinnerWithoutBackdrop = true;
    // obtenermos el valor de la fecha inicio
    const dateInit = this.frmGruopDate.controls.fechaInicio.value;
    const formatInit = this.datePipe.transform(dateInit, 'yyyy-MM-dd');
    const formatEnd = this.datePipe.transform(event.value, 'yyyy-MM-dd');
    if (formatInit !== null) {
      /**
       * TODO: comparar fecha inicio con fecha fin
       */

      /**
       * TODO: se agregar un settimeout
       */
      setTimeout(() => {
        this.spinnerWithoutBackdrop = false;
      }, 800);
      if (formatEnd > formatInit) {
        // si se cumple está condición vamos a cargar los datos para enviarlas
        const fechasEmitidas = {
          fechaInicio: new Date(formatInit),
          fechaFin: new Date(formatEnd)
        };
        /**
         * TODO: emitimos los parametros al padre.
         */
        this.Fechas.emit(fechasEmitidas);
      } else {
        this.sb.showSnackBar('La fecha de Inicio no debe de ser mayor a la fecha fin', 'Error!');
      }
    } else {
      this.sb.showSnackBar('No se puede realizar la acción.', 'Error!');
    }
  }
}
