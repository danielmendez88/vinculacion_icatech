import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, empty } from 'rxjs';
import { Injectable } from '@angular/core';
// modelos
import { DetalleSeguimiento } from '../models/seguimiento';
// servicio
import { SeguimientosService } from '../services/seguimientos.service';
import { catchError, take, map } from 'rxjs/operators';
// importar crypt service
import { CryptServiceService } from '../services/crypt-service.service';

/**
 * detalle del seguimiento en el resolve de los detalles del seguimiento
 * vienen asociados con un id que es el id del seguimiento, esto nos mostrará
 * los datos asociados del seguimiento con la vinculalción.
 */

@Injectable()
export class DetalleSeguimientoResolver implements Resolve<DetalleSeguimiento> {
  constructor(private seg: SeguimientosService, private crypt: CryptServiceService) {}

  // resolve
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DetalleSeguimiento> {
    const id = route.queryParamMap.get('agenda');
    // route.paramMap.get('idvinculacion');
    const strId = this.crypt.decryptUsingAES256(id);
    const idseguimiento = +strId;
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
