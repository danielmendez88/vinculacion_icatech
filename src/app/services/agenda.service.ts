import { Injectable } from '@angular/core';
// interfaces
import { Agenda, Todo, AgendaShow, UpdateVinculacionData, GetUserwithAgenda } from '../models/angendas';
// mapas
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError, map, retry } from 'rxjs/operators';
// importar http
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
// enviroment
import { environment } from '../../environments/environment';
// servicio auth
import { AuthService } from './auth.service';
// importar Cacheable
import { Cacheable } from 'ngx-cacheable';

/**
 * desarrollado por Daniel Méndez V.1.0
 */
const URL = 'agendasapi';
const URLOWN = 'ownagenda';
const URLSEGUIMIENTOUPDATE = 'updateseguimiento';
const URLUPDATE = 'updatevinculacion';
const URLHISTORY = 'getvinculadorhistorico';
const URLUPDATEAGENDABYCURSO = 'updateagendabycurso';
const URLGETASIGNADOPOR = 'agendaasignadopor';
const URLVINCULADORAGENDAS = 'usuarioporagenda';
const URLAGENDASPORVINCULADOR = 'agendasporvinculador';
const URLAGENDASPORVINCULADORDONE = 'agendasvinculadordone';
const URLHISTORICOVINCULADOR = 'agendahistoricovinculador';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  constructor(private http: HttpClient, private authserv: AuthService) { }
  // http options

    // damos permisos a las opciones http
    private httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // tslint:disable-next-line:object-literal-key-quotes
        'Access-Control-Allow-Origin': '*',
        // tslint:disable-next-line:object-literal-key-quotes
        'Authorization': 'Bearer ' + this.authserv.getToken()
      })
    };

    // datos de la respuesta
    private extractData(res: Response) {
      const body = res;
      return body || {};
    }

  /**
   * Agregar una función de error para interceptar nuestros errores en caso de ocurrir.
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  // insertar el registro
  @Cacheable()
  addAgenda(agenda: Agenda): Observable<any> {
    return this.http.post<Agenda>(`${environment.PATH_BASE}/${URL}`, agenda, this.httpOptions)
    .pipe(
      // tslint:disable-next-line:no-shadowed-variable
      // tap((agenda: Agenda) => console.log(`agregar agenda w/ id=${agenda.nombreEstudio }`)),
      tap((agendas: Agenda) => console.log(`added product w/ id=${ agendas.id }`)),
      catchError(this.handleError<Agenda>('addProduct'))
    );
  }

  // obtenemos los datos de un sólo usuario que se encuentra registrado
  @Cacheable()
  getAgenda(id): Observable<any> {
    return this.http.get(`${ environment.PATH_BASE}/${URL}/${id}`, this.httpOptions).pipe(map(this.extractData));
  }

  getAllOwnAgenda(id: number): Observable<any> {
    return this.http.get(`${environment.PATH_BASE}/${URLOWN}/${id}`, this.httpOptions).pipe(tap(data => console.log('Mostrar agendas')));
  }

  @Cacheable()
  // obtenemos todos los registros de las agendas del usuario
  getAllAgendas(id: number): Observable<any> {
    return this.http.get<AgendaShow[]>(`${ environment.PATH_BASE}/${URLGETASIGNADOPOR}/${id}`, this.httpOptions)
                    .pipe(
                      retry(3),
                      map(result => result),
                    );
  }

  addNewAgenda(agendas: Todo): Observable<any> {
    return this.http.post<Todo>(`${environment.PATH_BASE}/${URL}`, agendas, this.httpOptions)
                              .pipe(
                                tap((agends: Todo) => console.log(`agenda agregada w/ id=${ agends.id}`)),
                                catchError(this.handleError<Todo>('addAgend'))
                              );
  }

  @Cacheable()
  updateSeguimiento(agenda: number): Observable<any> {
    return this.http.get<any>(`${environment.PATH_BASE}/${URLSEGUIMIENTOUPDATE}/${agenda}`, this.httpOptions)
                         .pipe(
                           map(this.extractData),
                           catchError(this.handleError<Todo>('addAgend'))
                         );
  }

  // actualizar el seguimiento
  updateVinculacion(agendasForm: UpdateVinculacionData): Observable<any> {
    return this.http.post<UpdateVinculacionData>(`${environment.PATH_BASE}/${URLUPDATE}/${agendasForm.id}`, agendasForm, this.httpOptions)
          .pipe(
            tap((forms) => console.log(forms)),
            catchError(this.handleError<UpdateVinculacionData>('addAgend'))
          );
  }

  // get historicos
  @Cacheable()
  getHistory(): Observable<any> {
    return this.http.get<Agenda>(`${environment.PATH_BASE}/${URLHISTORY}/${this.authserv.getCurrentUser()}`, this.httpOptions)
               .pipe(
                 tap((response) => console.log(response)),
                 catchError(this.handleError<Agenda>('addAgend'))
               );
  }

  /**
   * update flag in service
   */
  async updateIsCurso(id: string): Promise<any> {
    const respuesta = await this.http.get(`${environment.PATH_BASE}/${URLUPDATEAGENDABYCURSO}/${id}`, this.httpOptions)
                      .toPromise();
    return respuesta;
  }

  /**
   * get users data from row called asignadoPor
   */
  getVinculadorAgenda(id: number): Observable<GetUserwithAgenda> {
    const response = this.http.get(`${environment.PATH_BASE}/${URLVINCULADORAGENDAS}/${id}`, this.httpOptions);
    return response;
  }

  @Cacheable()
  getAgendasporVinculador(id: number): Observable<any> {
    const res = this.http.get(`${environment.PATH_BASE}/${URLAGENDASPORVINCULADOR}/${id}`, this.httpOptions);
    return res;
  }

  @Cacheable()
  getAgendaVinculadorDone(id: number): Observable<any> {
    // tslint:disable-next-line:max-line-length
    const response = this.http.get(`${environment.PATH_BASE}/${URLAGENDASPORVINCULADORDONE}/${id}/${this.authserv.getCurrentUser()}`, this.httpOptions);
    return response;
  }

  @Cacheable()
  getHistoricalVinculador(id: number): Observable<any> {
    const res = this.http.get(`${environment.PATH_BASE}/${URLHISTORICOVINCULADOR}/${id}`, this.httpOptions);
    return res;
  }

}
