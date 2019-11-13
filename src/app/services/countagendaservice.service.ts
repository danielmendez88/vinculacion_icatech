import { Injectable } from '@angular/core';
// importar auth service
import { AuthService } from './auth.service';
// importar entorno
import { environment } from '../../environments/environment';
// importar cabeceras
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

const URLCOUNTAGENDA = 'getcountdata';
const URLCOUNTAGENDASEGUIMIENTO = 'getcountdataseguimiento';
const URLCOUNTAGENDATERMINADO = 'getcountdataterminado';

@Injectable({
  providedIn: 'root'
})
export class CountagendaserviceService {

  constructor(private https: HttpClient, private auth: AuthService) { }

  // permisos a opciones a https
  private httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': 'http://www.apisivic.icatech.gob.mx/',
      // tslint:disable-next-line:object-literal-key-quotes
      'Accept': 'application/json',
      // tslint:disable-next-line:object-literal-key-quotes
      'Authorization': 'Bearer ' + this.auth.getToken()
    })
  };

  /**
   * modificación de algún método para la ejecución en el servicio
   */
  async getallagendas(roles$: string, currentId$: number): Promise<number> {
    const response = await this.https.get<any>(`${environment.PATH_BASE}/${URLCOUNTAGENDA}/${roles$}/${currentId$}`, this.httpOptions)
                    .toPromise() as number;
    return response;
  }

  /**
   * modificacion de algún método para la ejecución en el servicio, aquí traemos las agendas que ya han sido atendidas
   */
  async getagendasseguimiento(rol$: string, Id$: number): Promise<number> {
    const response = await this.https.get<any>(`${environment.PATH_BASE}/${URLCOUNTAGENDASEGUIMIENTO}/${rol$}/${Id$}`, this.httpOptions)
                    .toPromise() as number;
    return response;
  }
  /**
   * modificacion de algún método para la ejecución en el servicio
   */
  async getagendasterminadas(rol$: string, currentId$: number): Promise<number> {
    // tslint:disable-next-line:max-line-length
    const response = await this.https.get<any>(`${environment.PATH_BASE}/${URLCOUNTAGENDATERMINADO}/${rol$}/${currentId$}`, this.httpOptions)
                    .toPromise() as number;
    return response;
  }
}
