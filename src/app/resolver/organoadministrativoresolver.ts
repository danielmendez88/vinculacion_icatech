import { catchError, mergeMap, take, map } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
// importar encuesta service
import { CuestionariodncService } from '../services/cuestionariodnc.service';
// importar servicio auth
import { AuthService } from '../services/auth.service';
// importar Modelo Adscripcion
import { Adscripcion } from '../models/adscripcion';

@Injectable({
  providedIn: 'root'
})
export class Organoadministrativoresolver implements Resolve<Adscripcion> {
  constructor(private cuestionario: CuestionariodncService, private auth: AuthService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Adscripcion> | Observable<never> {
    const idOrgano = +this.auth.getadministrative;
    return this.cuestionario.getAdministrative(idOrgano).pipe(
      catchError(error => {
        return EMPTY;
      }), map( (response: Adscripcion) => response),
      take(2)
    );
  }
}
