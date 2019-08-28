import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from 'node_modules/@angular/router';
// importar el servicio
import { AgendaService } from '../services/agenda.service';
// modelo agenda
import { AllAgenda } from '../models/angendas';
import { Observable } from 'node_modules/rxjs';
import { take, map } from 'rxjs/operators';

@Injectable()
export class CalendarioService implements Resolve<AllAgenda> {

  constructor(private Agendas: AgendaService) { }

  // propiedad resolve
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AllAgenda> {
    const idUser = localStorage.getItem('currentUserId');
    const idNumber = +idUser;
    return this.Agendas.getAllOwnAgenda(idNumber).pipe(
      take(1),
      map((agenda: AllAgenda) => agenda)
    );
  }
}
