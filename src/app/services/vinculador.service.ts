import { Injectable } from '@angular/core';
// importar tipo visita
import { Vinculador } from '../models/clientes';
// cabeceras http
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// importar observable
import { Observable } from 'rxjs';
// importar enviroment
import { environment } from '../../environments/environment';
// import operadores
import { catchError } from 'rxjs/operators';
// throwError
import { throwError } from 'rxjs';
// auth service
import { AuthService } from './auth.service';

const URLVINCULADOR = 'vinculador';

@Injectable({
  providedIn: 'root'
})
export class VinculadorService {

  constructor(private https: HttpClient, private auth: AuthService) { }
  // permiso a https
  private HttpOptions = {
    headers: new HttpHeaders({
      // tslint:disable-next-line:object-literal-key-quotes
      'Accept': 'application/json',
      // tslint:disable-next-line:object-literal-key-quotes
      'Authorization': 'Bearer ' + this.auth.getToken()
    })
  };
  // obtener solo los vinculadores que se encuentran a cargo de esta persona
  getVinculador(idadministrative: number, idadscription: number, id: number): Observable<Vinculador[]> {
    // tslint:disable-next-line:max-line-length
    return this.https.get<Vinculador[]>(`${environment.PATH_BASE}/${URLVINCULADOR}/${idadministrative}/${idadscription}/${id}`, this.HttpOptions)
            .pipe(
              catchError(this.handleError)
            );
  }

  // manejo de errores
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
