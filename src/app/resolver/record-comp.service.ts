import { Injectable } from '@angular/core';
// interface
import { Cursos } from '../models/cursos';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
// servicio
import { CursosService } from '../services/cursos.service';


@Injectable()
export class RecordCompService implements Resolve<Cursos> {

  constructor(private cursos: CursosService) { }

  // propiedad resolve
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Cursos> | Promise<Cursos> {
    return this.cursos.getAllCursos();
  }
}
