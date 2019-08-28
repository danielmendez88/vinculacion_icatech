import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, empty } from 'rxjs';
import { Injectable } from '@angular/core';
// modelos
import { DetalleSeguimiento } from '../models/seguimiento';
// servicio
import { SeguimientosService } from '../services/seguimientos.service';
import { catchError, take, map } from 'rxjs/operators';

/**
 * detalle del seguimiento en el resolve de los detalles del seguimiento
 * vienen asociados con un id que es el id del seguimiento, esto nos mostrará
 * los datos asociados del seguimiento con la vinculalción.
 */

@Injectable()
export class DetalleSeguimientoResolver implements Resolve<DetalleSeguimiento> {
  constructor(private seg: SeguimientosService) {}

  // resolve
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DetalleSeguimiento> {
    const id = route.paramMap.get('idvinculacion');
    const idseguimiento = +id;
    return this.seg.getSeguimientobyId(idseguimiento).pipe(
      take(1),
      map((detalle: DetalleSeguimiento) => detalle),
      catchError((error) => {
        console.error(error);
        return empty();
      })
    );
  }
}
