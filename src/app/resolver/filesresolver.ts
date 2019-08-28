import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, empty } from 'rxjs';
// importar
import { SeguimientosService } from '../services/seguimientos.service';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class Filesresolver implements Resolve<any> {

  constructor(private fileser: SeguimientosService) {}
  // resolver
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.paramMap.get('idvinculacion');
    const idseg = +id;
    return this.fileser.getFilesFromSeguimientoById(idseg).pipe(
      catchError((error) => {
        console.error(error);
        return empty();
      })
    );
  }
}
