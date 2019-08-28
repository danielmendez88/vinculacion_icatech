import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, empty } from 'rxjs';
// importar modelo
import { Incidencias } from '../models/incidencias';
// importar servicio
import { IncidenciasService } from '../services/incidencias.service';
import { catchError, take, map } from 'rxjs/operators';
import 'rxjs/add/observable/of';
import { Injectable } from '@angular/core';

@Injectable()
export class IncidenciaResolver implements Resolve<Incidencias> {
  constructor(private incidencia: IncidenciasService) {}
  // resolver
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Incidencias> {
    return this.incidencia.getIncidencias()
    .pipe(
      take(1),
      map((incidencia: Incidencias) => incidencia),
      catchError(err => {
        console.error(err);
        return empty();
      })
    );
  }
}
