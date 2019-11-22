import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from 'node_modules/@angular/router';
import { Observable, empty } from 'node_modules/rxjs';
import { AgendaShow } from '../models/angendas';
import { AgendaService } from '../services/agenda.service';
import { AuthService } from '../services/auth.service';
import { take, catchError } from 'node_modules/rxjs/operators';

@Injectable()
export class AgendasasignadasResolverService implements Resolve<AgendaShow> {

  constructor(private agenda: AgendaService, private auth: AuthService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AgendaShow> {
    const id = route.paramMap.get('idUsuario');
    const idUsuario = atob(id);
    const idusuarioNum = +idUsuario;
    return this.agenda.getAgendasporVinculador(idusuarioNum).pipe(
      take(2),
      catchError((error) => {
        console.error(error);
        return empty();
      })
    );
  }
}
