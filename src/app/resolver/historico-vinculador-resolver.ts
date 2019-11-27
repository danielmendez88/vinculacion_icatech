import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AgendaShow } from '../models/angendas';
import { Injectable } from '@angular/core';
import { Observable, empty } from 'rxjs';
import { AgendaService } from '../services/agenda.service';
import { catchError, take } from '../../../node_modules/rxjs/operators';

@Injectable()
export class HistoricoVinculadorResolver implements Resolve<AgendaShow> {
  constructor(private agenda: AgendaService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AgendaShow> {
    const idUser = localStorage.getItem('currentUserId');
    const idNumber = +idUser;
    return this.agenda.getHistoricalVinculador(idNumber).pipe(
      take(2),
      catchError((error) => {
        console.log(error);
        return empty();
      })
    );
  }
}
