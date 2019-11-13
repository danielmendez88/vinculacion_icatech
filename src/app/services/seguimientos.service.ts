import { Injectable } from '@angular/core';
// cabeceras
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// importar observable
import { Observable, of, throwError } from 'rxjs';
// importar enviroment
import { environment } from '../../environments/environment';
// import operadores
import { tap, catchError } from 'rxjs/operators';
// auth service
import { AuthService } from './auth.service';
// modelos seguimientos
import { Seguimiento, Archivos } from '../models/seguimiento';

const URL = 'seguimiento';
const URLSEG = 'seguimientosdetalle';
const URLFILE = 'getfilesSeguimiento';
const URLFILEPOST = 'seguimientofile';
const URLFILEPROPUESTA = 'getfilepdfagenda';
@Injectable({
  providedIn: 'root'
})
export class SeguimientosService {

  constructor(private https: HttpClient, private auth: AuthService) { }

  // permisos a opciones http
  private httpOptions = {
    headers: new HttpHeaders({
      // tslint:disable-next-line:object-literal-key-quotes
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': 'http://www.apisivic.icatech.gob.mx/',
      // tslint:disable-next-line:object-literal-key-quotes
      'Authorization': 'Bearer ' + this.auth.getToken()
    })
  };

  // enviar del formulario
  createSeguimiento(id: number, form): Observable<any> {
    return this.https.post<any>(`${environment.PATH_BASE}/${URL}/${id}`, form, this.httpOptions)
            .pipe(catchError(this.handleError));
  }

  // get seguimiento
  getSeguimientobyId(id: number): Observable<any> {
    return this.https.get(`${environment.PATH_BASE}/${URLSEG}/${id}`, this.httpOptions)
                     .pipe(catchError(this.handleError));
  }

  // optener el archivos de los seguimientos
  getFilesFromSeguimientoById(id: number): Observable<Archivos> {
    return this.https.get<Archivos>(`${environment.PATH_BASE}/${URLFILE}/${id}`, this.httpOptions);
  }

  // enviar archivo al seguimiento denominado
  createfileseguimiento(id: number, formulario): Observable<any> {
    return this.https.post<any>(`${environment.PATH_BASE}/${URLFILEPOST}/${id}`, formulario, this.httpOptions)
           .pipe(catchError(this.handleError));
  }
  // Obtener los archivos de los seguimientos (sólo pdf)
  getfilespropuestaFromSeguimientoBy(id: number): Observable<Archivos> {
    return this.https.get<Archivos>(`${environment.PATH_BASE}/${URLFILEPROPUESTA}/${id}`, this.httpOptions);
  }

  /**
   * Agregar una función de error para interceptar nuestros errores en caso de ocurrir.
   */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Algo Mal sucedio. Por favor intentar más tarde.');
  }

}
