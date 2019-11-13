import { Injectable } from '@angular/core';
// cabeceras
import { HttpClient, HttpHeaders } from '@angular/common/http';
// importar observable
import { Observable } from 'rxjs';
// importar enviroment
import { environment } from '../../environments/environment';
// import operadores
import { tap } from 'rxjs/operators';
// importar interface
import { Estados } from '../models/estado';
// auth service
import { AuthService } from './auth.service';

const URL = 'estados';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  constructor(private https: HttpClient, private authser: AuthService) { }

    // permisos a opciones http
    private httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        // tslint:disable-next-line:object-literal-key-quotes
        'Accept': 'application/json',
        // tslint:disable-next-line:object-literal-key-quotes
        'Authorization': 'Bearer ' + this.authser.getToken()
      })
    };

  // optener el listado de los estados
  getEstados(): Observable<Estados[]> {
    return this.https.get<Estados[]>(`${environment.PATH_BASE}/${URL}`, this.httpOptions).pipe(
      tap(heroes => console.log('Mostrar Estados'))
    );
  }
}
