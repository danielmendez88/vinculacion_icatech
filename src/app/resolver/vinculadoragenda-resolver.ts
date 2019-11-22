import { GetUserwithAgenda } from '../models/angendas';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AgendaService } from '../services/agenda.service';
import { Observable, empty } from 'node_modules/rxjs';
import { AuthService } from '../services/auth.service';
import { take, catchError } from 'node_modules/rxjs/operators';

@Injectable()
export class VinculadoragendaResolver implements Resolve<GetUserwithAgenda> {
  constructor(private ags: AgendaService, private auth: AuthService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GetUserwithAgenda> {
    let id: number;
    id = this.auth.useridCurrent;
    return this.ags.getVinculadorAgenda(id).pipe(
      take(2),
      catchError((error) => {
        console.error(error);
        return empty();
      })
    );
  }
}
