import { Injectable } from '@angular/core';
// cabeceras https
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// enviroment
import { environment } from '../../environments/environment';
// modelo cliente
import { Cliente } from '../models/clientes';
// import operadores
import { tap, catchError } from 'rxjs/operators';
// throwError
import { throwError } from 'rxjs';
// auth service
import { AuthService } from './auth.service';

const URLCLIENTE = 'clientes';
@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private https: HttpClient, private auth: AuthService) { }

  // permisos a opciones http
  private httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': 'http://www.apisivic.icatech.gob.mx/',
      // tslint:disable-next-line:object-literal-key-quotes
      'Accept': 'application/json',
      // tslint:disable-next-line:object-literal-key-quotes
      'Authorization': 'Bearer ' + this.auth.getToken()
    })
  };

  // obtener a los clientes de determinadoslugares
  getClientes(cliente: number) {
    return this.https.get(`${environment.PATH_BASE}/${URLCLIENTE}/${cliente}`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  // manejo de herrores
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // un error del lado del cliente o red ha ocurrido. manejarlo acorde
      console.error('Un error ha Ocurrido: ', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }

    // return an observable with a user-facing error message
    return throwError('Something bad happened. Please try again later.');
  }
}
