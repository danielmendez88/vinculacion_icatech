import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
// importar servicio
import { AgendaService } from '../services/agenda.service';
// onservable
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';

@Injectable()
export class Historicodirectores implements Resolve<Observable<string>> {
  constructor(private agenda: AgendaService) {}
  // Resolve
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.agenda.getHistory();
  }
}
