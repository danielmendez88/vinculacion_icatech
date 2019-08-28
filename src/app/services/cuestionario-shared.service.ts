import { Injectable } from '@angular/core';
import { BehaviorSubject } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuestionarioSharedService {
  // tslint:disable-next-line:variable-name
  curso_capacitacion_desmpenio_trabajo: string;
  cursoCapacitacionBS = new BehaviorSubject<string>('');

  constructor() {
    /**
     * inicializamos los componentes
     */
    // tslint:disable-next-line:no-unused-expression
    this.curso_capacitacion_desmpenio_trabajo;
    this.cursoCapacitacionBS.next(this.curso_capacitacion_desmpenio_trabajo);
   }

   updateComp(val) {
     this.curso_capacitacion_desmpenio_trabajo = val;
     this.cursoCapacitacionBS.next(this.curso_capacitacion_desmpenio_trabajo);
   }
}
