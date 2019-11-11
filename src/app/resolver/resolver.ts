import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of, empty } from 'rxjs';
// importar el injectable
import { Injectable } from '@angular/core';
// servicio agenda
import { AgendaService } from '../services/agenda.service';
// importar modelo agenda
import { AgendaShow } from '../models/angendas';
import { take, map, catchError } from 'rxjs/operators';
// importamos service auth
import { AuthService } from '../services/auth.service';


@Injectable()
export class Resolver implements Resolve<AgendaShow> {
  constructor(private agendaService: AgendaService, private auth: AuthService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AgendaShow> {
    // convertir entero en string
    let id: number;
    id = this.auth.useridCurrent;
    return this.agendaService.getAllAgendas(id).pipe(
      take(2),
      map((detalle: AgendaShow) => detalle),
      catchError((error) => {
        console.error(error);
        return empty();
      })
    );
  }
}
