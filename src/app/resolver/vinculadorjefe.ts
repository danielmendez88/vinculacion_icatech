import { Resolve, ActivatedRoute, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, empty } from 'rxjs';
// importar tipo visita
import { Vinculador } from '../models/clientes';
import { VinculadorService } from '../services/vinculador.service';
import { AuthService } from '../services/auth.service';
import { take, catchError } from '../../../node_modules/rxjs/operators';

@Injectable()
export class Vinculadorjefe implements Resolve<Vinculador> {
  constructor(
    private vinculadorservice: VinculadorService,
    private auth: AuthService
  ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Vinculador> {
    let id: number;
    id = this.auth.useridCurrent;
    let administrative: number;
    administrative = +this.auth.getadministrative;
    return this.vinculadorservice.getVinculadorJefe(administrative, id).pipe(
      take(2),
      catchError((error) => {
        console.error(error);
        return empty();
      })
    );
  }
}
