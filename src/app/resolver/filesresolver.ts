import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, empty } from 'rxjs';
// importar
import { SeguimientosService } from '../services/seguimientos.service';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
// importar crypt service
import { CryptServiceService } from '../services/crypt-service.service';

@Injectable()
export class Filesresolver implements Resolve<any> {

  constructor(private fileser: SeguimientosService, private crypt: CryptServiceService) {}
  // resolver
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.queryParamMap.get('agenda');
    // route.paramMap.get('idvinculacion');
    const strId = this.crypt.decryptUsingAES256(id);
    const idseg = +strId;
    return this.fileser.getFilesFromSeguimientoById(idseg).pipe(
      catchError((error) => {
        console.error(error);
        return empty();
      })
    );
  }
}
