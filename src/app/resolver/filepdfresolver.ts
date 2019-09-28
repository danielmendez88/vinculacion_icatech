import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, empty } from 'rxjs';
// importar
import { SeguimientosService } from '../services/seguimientos.service';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class Filepdfresolver implements Resolve<any> {
    constructor(private sg: SeguimientosService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const id = route.paramMap.get('idvinculacion');
      const idseg = +id;
      return this.sg.getfilespropuestaFromSeguimientoBy(idseg).pipe(
          catchError((error) => {
            console.error(error);
            return empty();
          })
      );
    }

}
