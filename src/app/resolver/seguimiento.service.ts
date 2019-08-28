import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// servicio
import { AgendaService } from '../services/agenda.service';
// modelo
import { Agenda } from '../models/angendas';
import { Observable, empty } from 'rxjs';
import { catchError, take, map } from 'rxjs/operators';
// importar modelo DetalleSeguimiento
/**
 * llamamos a este resolver para cargar los datos de los detalles del seguimiento antes
 * de cargar la plantilla del componente destino con la intención de que el la experiencia de usuario
 * sea mejor para que los tiempos de carga sean menores.
 */

@Injectable()
export class SeguimientoService implements Resolve<Agenda> {

  constructor(private agendas: AgendaService) { }

  // propiedad del resolve
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Agenda> {
    const id = route.paramMap.get('idvinculacion');
    const ids = +id;
    return this.agendas.getAgenda(ids).pipe(
      take(1),
      map((agenda: Agenda) => agenda),
      catchError((error) => {
        console.error(error);
        return empty();
      })
    );
  }
}
