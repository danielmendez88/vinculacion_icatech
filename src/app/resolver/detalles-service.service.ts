import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// agenda del servicio
import { AgendaService } from '../services/agenda.service';

import { Observable, empty, forkJoin } from 'rxjs';
// importar servicio de seguimiento
import { SeguimientosService } from '../services/seguimientos.service';
import { catchError } from 'rxjs/operators';
// importar crypto
import { CryptServiceService } from '../services/crypt-service.service';
// empty

@Injectable({
  providedIn: 'root'
})
export class DetallesServiceService implements Resolve<Observable<string>> {
  constructor(private agendaS: AgendaService, private seg: SeguimientosService, private crypt: CryptServiceService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.paramMap.get('idvinculacion');
    console.log(id);
    // convertir ese string en un id
    const strId = this.crypt.decryptUsingAES256(id);
    console.log(strId);
    const idseguimiento = +strId;
    console.log(idseguimiento);
    return this.agendaS.getAgenda(idseguimiento).pipe(
      catchError((error) => {
        console.log(error);
        return empty();
      })
    );
  }
}
