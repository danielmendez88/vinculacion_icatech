import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AgendaShow } from '../models/angendas';
import { Observable, empty } from 'node_modules/rxjs';
import { AgendaService } from '../services/agenda.service';
import { AuthService } from '../services/auth.service';
import { take, map, catchError } from 'node_modules/rxjs/operators';
import { Injectable } from '../../../node_modules/@angular/core';

@Injectable()
export class Listaagendaresolver implements Resolve<AgendaShow> {

  constructor(private agendaService: AgendaService, private auth: AuthService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AgendaShow> {
    let id: string;
    id = this.auth.useridCurrent.toString();
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
