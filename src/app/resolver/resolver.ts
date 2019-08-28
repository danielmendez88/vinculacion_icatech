import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
// importar el injectable
import { Injectable } from '@angular/core';
// servicio agenda
import { AgendaService } from '../services/agenda.service';


@Injectable()
export class Resolver implements Resolve<Observable<string>> {
  constructor(private agenda: AgendaService) {}

  resolve() {
    return this.agenda.getAllAgendas();
  }
}
