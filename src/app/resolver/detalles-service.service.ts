import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// agenda del servicio
import { AgendaService } from '../services/agenda.service';

import { Observable, empty, forkJoin } from 'rxjs';
// importar servicio de seguimiento
import { SeguimientosService } from '../services/seguimientos.service';
import { catchError } from 'rxjs/operators';
// empty

@Injectable({
  providedIn: 'root'
})
export class DetallesServiceService implements Resolve<Observable<string>> {
  constructor(private agendaS: AgendaService, private seg: SeguimientosService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.paramMap.get('idvinculacion');
    const idseguimiento = +id;
    return this.agendaS.getAgenda(idseguimiento).pipe(
      catchError((error) => {
        console.log(error);
        return empty();
      })
    );
  }
}
