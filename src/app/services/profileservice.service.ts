import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// enviroment
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

const URLPERFIL = 'getprofile';
const URLUPDATEPERFIL = 'updateprofile';

@Injectable({
  providedIn: 'root'
})
export class ProfileserviceService {

  constructor(private https: HttpClient, private auth: AuthService) { }

  // permisos a opciones http
  private httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      // tslint:disable-next-line:object-literal-key-quotes
      'Accept': 'application/json',
      // tslint:disable-next-line:object-literal-key-quotes
      'Authorization': 'Bearer ' + this.auth.getToken()
    })
  };

  // obtener a los clientes de determinadoslugares
  getProfile(idUser: number) {
    return this.https.get(`${environment.PATH_BASE}/${URLPERFIL}/${idUser}`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  updateProfile(profile: any, iduser: number): Observable<any> {
    return this.https.post(`${environment.PATH_BASE}/${URLUPDATEPERFIL}/${iduser}`, profile, this.httpOptions).pipe(
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
