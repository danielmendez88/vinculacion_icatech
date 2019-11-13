import { Injectable } from '@angular/core';
// importar tipo visita
import { TipoVisita } from '../models/tipoVisita';
// cabeceras http
import { HttpClient, HttpHeaders } from '@angular/common/http';
// importar observable
import { Observable } from 'rxjs';
// importar enviroment
import { environment } from '../../environments/environment';
// import operadores
import { tap } from 'rxjs/operators';
// auth service
import { AuthService } from './auth.service';

const URLVISITA = 'tipovisita';

@Injectable({
  providedIn: 'root'
})
export class TipovisitaService {

  constructor(private https: HttpClient, private auth: AuthService) { }

  // permiso a https
  private HttpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': 'http://www.apisivic.icatech.gob.mx/',
      // tslint:disable-next-line:object-literal-key-quotes
      'Accept': 'application/json',
      // tslint:disable-next-line:object-literal-key-quotes
      'Authorization': 'Bearer ' + this.auth.getToken()
    })
  };

  // obtener el listado de los tipos de visitas
  getTipoVisita(): Observable<TipoVisita[]> {
    return this.https.get<TipoVisita[]>(`${environment.PATH_BASE}/${URLVISITA}`, this.HttpOptions).pipe(
      tap(tipo => console.log('mostrar visitas'))
    );
  }
}
