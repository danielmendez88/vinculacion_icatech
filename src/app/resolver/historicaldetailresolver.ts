import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AgendaShow } from '../models/angendas';
import { AgendaService } from '../services/agenda.service';
import { AuthService } from '../services/auth.service';
import { take, catchError } from 'rxjs/operators';
import { empty, Observable } from 'rxjs';
import { Injectable } from '../../../node_modules/@angular/core';

@Injectable()
export class Historicaldetailresolver implements Resolve<AgendaShow> {
  constructor(private agenda: AgendaService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AgendaShow> {
    const id = route.queryParamMap.get('vinculador');
    const idUsuario = atob(id);
    const idusuarioNum = +idUsuario;
    return this.agenda.getAgendaVinculadorDone(idusuarioNum).pipe(
      take(2),
      catchError((error) => {
        console.error(error);
        return empty();
      })
    );
  }
}
