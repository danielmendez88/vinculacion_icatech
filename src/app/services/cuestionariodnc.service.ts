import { Injectable } from '@angular/core';
// enviroment
import { environment } from '../../environments/environment';
// servicio auth
import { AuthService } from './auth.service';
// importar Cacheable
import { Cacheable } from 'ngx-cacheable';
// protocolos http
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { DncModel } from '../models/dncmodel';

/**
 * Desarrollado por Daniel Méndez V.1.0
 */

const URL = 'agendadnc';
const URLDNC = 'agendadncseguimiento';

@Injectable({
  providedIn: 'root'
})
export class CuestionariodncService {

  constructor(private http: HttpClient, private authserv: AuthService) { }

  // opciones http
  private httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      'Access-Control-Allow-Origin': 'http://www.apisivic.icatech.gob.mx/',
      Authorization: 'Bearer ' + this.authserv.getToken()
    })
  };

  // datos de la respuesta
  private extractData(res: Response) {
    const body = res;
    return body || [];
  }

  // insertar un registro
  @Cacheable()
  addDnc(form): Observable<any> {
    return this.http.post<any>(`${environment.PATH_BASE}/${URL}`, form, this.httpOptions)
                    .pipe(
                      tap((forms) => console.log(forms))
                    );
  }
 /**
  * mostrar el registro de un id dado - la petición deberá devolver
  * todos los resultados vinculados al id.
  */
  @Cacheable()
  getDncFromIdAgenda(id: number): Observable<any> {
    return this.http.get(`${environment.PATH_BASE}/${URL}/${id}`, this.httpOptions)
                    .pipe(
                      map(this.extractData)
                    );
  }
  /**
   * mostrar los registros de un id - la petición deberá volver un dnc
   */
  @Cacheable()
  getDncFromAgenda(id: number): Observable<any> {
    return this.http.get(`${environment.PATH_BASE}/${URLDNC}/${id}`, this.httpOptions)
                    .pipe(
                      map(this.extractData)
                    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
