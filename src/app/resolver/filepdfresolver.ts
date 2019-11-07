import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, empty } from 'rxjs';
// importar
import { SeguimientosService } from '../services/seguimientos.service';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
// importar crypt service
import { CryptServiceService } from '../services/crypt-service.service';

@Injectable()
export class Filepdfresolver implements Resolve<any> {
    constructor(private sg: SeguimientosService, private crypt: CryptServiceService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const id = route.paramMap.get('idvinculacion');
      const strId = this.crypt.decryptUsingAES256(id);
      const idseg = +strId;
      return this.sg.getfilespropuestaFromSeguimientoBy(idseg).pipe(
          catchError((error) => {
            console.error(error);
            return empty();
          })
      );
    }

}
