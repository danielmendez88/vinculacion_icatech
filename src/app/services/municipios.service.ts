/**
 * Desarrollado por Daniel Méndez Cruz
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// modelos
import { Municipios } from '../models/municipios';
// importar observable
import { Observable } from 'rxjs';
// importar enviroment
import { environment } from '../../environments/environment';
// importar operadores
import { tap } from 'rxjs/operators';
// auth service
import { AuthService } from './auth.service';

const URL = 'municipios';

@Injectable({
  providedIn: 'root'
})
export class MunicipiosService {

  constructor(private https: HttpClient, private authser: AuthService) { }

   // damos permisos a las opciones http
   public httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': 'http://www.apisivic.icatech.gob.mx/',
      // tslint:disable-next-line:object-literal-key-quotes
      'Accept': 'application/json',
      // tslint:disable-next-line:object-literal-key-quotes
      'Authorization': 'Bearer ' + this.authser.getToken()
    })
  };

  // obtener el listado de los municipios
  getAllMunicipios(): Observable<Municipios[]> {
    return this.https.get<Municipios[]>(`${environment.PATH_BASE}/${URL}`, this.httpOptions).pipe(
      tap(heroes => console.log('Mostrar Municipios'))
    );
  }
}
