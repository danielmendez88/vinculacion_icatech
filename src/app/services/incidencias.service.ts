import { Injectable } from '@angular/core';
// modelo incidencia
import { Incidencias } from '../models/incidencias';
// entorno
import { environment } from '../../environments/environment';
// cabeceras
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// servicio de auth
import { AuthService } from './auth.service';
import { Observable, throwError } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
// importar Cacheable
import { Cacheable } from 'ngx-cacheable';

const URL = 'getincidencias';
@Injectable({
  providedIn: 'root'
})
export class IncidenciasService {

  constructor(private https: HttpClient, private auth: AuthService) { }

  // permisos con opciones http
  private httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      // tslint:disable-next-line:object-literal-key-quotes
      'Accept': 'application/json',
      // tslint:disable-next-line:object-literal-key-quotes
      'Authorization': 'Bearer ' + this.auth.getToken()
    })
  };

  // optener el listado de las incidencias
  @Cacheable()
  getIncidencias(): Observable<Incidencias> {
    return this.https.get<Incidencias>(`${ environment.PATH_BASE }/${URL}`, this.httpOptions)
               .pipe(
                 retry(3),
                 map(result => result),
                 catchError(this.handleError)
                );
  }

  /**
   * agregar funcion que intercepta el error en caso de ocurrir
   */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('Un error ha ocurrido:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Algo malo sucedio. Por favor intentelo después.');
  }

}
