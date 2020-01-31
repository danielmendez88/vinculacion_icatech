import { Injectable } from '@angular/core';
// mapas
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError, map, retry } from 'rxjs/operators';
// importar http
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
// enviroment
import { environment } from '../../environments/environment';
// servicio auth
import { AuthService } from './auth.service';
// interface
import { CategoriaCursos, Cursos, CursosbyId } from '../models/cursos';
// cachable
import { Cacheable } from 'ngx-cacheable';
// importar cryptojs
import * as CryptoJS from 'crypto-js';
/**
 * DESARROLLADO POR DANIEL MÉNDEZ CRUZ V.1.0
 */
// CONSTANTES PARA LAS URLS DE LA API
const URLCATEGORIACURSO = 'categoriacurso';
const URLALLCURSOS = 'cursostotales';
const URLCURSOPORCATEGORIA = 'cursosporcategoria';
const URLCURSOBYID = 'cursobyid';
const URLPOSTCURSOSBYAGENDA = 'agendacursos';
const URLGETCURSOBYAGENDA = 'getcoursebyagenda';
const URLGETPRINTCURSOS = 'getprintcursos';
const URLCURSOVENDIDO = 'cursovendido';
const URLLISTACURSOSVENDIDOS = 'listacursosvendidos';
const URLCHECKCURSOS = 'checarcursos';
const URLSENDBUYCOURSES = 'vendercursos';
const URLCURSOSDONE = 'cursosdone';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  // inicalizar los protocolos en el constructor
  constructor(private http: HttpClient, private auth: AuthService) { }
  // damos permiso a las opciones http
  private httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: 'Bearer ' + this.auth.getToken()
    })
  };
  // datos de la respuesta
  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  // decorador
  @Cacheable()
  // mostrar el registro
  getCatCurso(): Observable<any> {
    return this.http.get<CategoriaCursos[]>(`${environment.PATH_BASE}/${URLCATEGORIACURSO}`, this.httpOptions)
                    .pipe(
                      retry(3),
                      map(result => result),
                      catchError(this.handleError)
                    );
  }

  // decorador
  @Cacheable()
  // mostrar todos los cursos
  getAllCursos(): Observable<any> {
    return this.http.get<Cursos[]>(`${environment.PATH_BASE}/${URLALLCURSOS}`, this.httpOptions)
                    .pipe(
                      retry(3),
                      map(result => result),
                      catchError(this.handleError)
                    );
  }

  @Cacheable()
  getCursoPorCategoria(cateogryId: number): Observable<any> {
    return this.http.get<Cursos[]>(`${environment.PATH_BASE}/${URLCURSOPORCATEGORIA}/${cateogryId}`, this.httpOptions)
                    .pipe(
                      retry(3),
                      map(result => result),
                      catchError(this.handleError)
                    );
  }

  async getCursoById(idCurso: string): Promise<any> {
    const response = await this.http.get<CursosbyId>(`${environment.PATH_BASE}/${URLCURSOBYID}/${idCurso}`, this.httpOptions)
                    .toPromise();
    return response;
  }

  async sendCursosByAgenda(idAgenda: number, form): Promise<any> {
    const response = await this.http.post(`${environment.PATH_BASE}/${URLPOSTCURSOSBYAGENDA}/${idAgenda}`, form, this.httpOptions)
                     .toPromise();
    return response;
  }

  /**
   * cursos vendidos
   */
  sendCursoVendidos(forms): Observable<any> {
    return this.http.post<any>(`${environment.PATH_BASE}/${URLCURSOVENDIDO}`, forms, this.httpOptions)
           .pipe(
             retry(3),
             map(result => result),
             catchError(this.handleError)
           );

  }
  /**
   * curso service get cursos from idAgenda
   */
  async getCursobyIdAgenda(id: string): Promise<any> {
    const respuesta = await this.http.get<CursosbyId>(`${environment.PATH_BASE}/${URLGETCURSOBYAGENDA}/${id}`, this.httpOptions)
                      .toPromise();
    return respuesta;
  }
  /**
   * obtener los cursos de las IdAgenda
   */
  getCursobyAgenda(id: string) {
    return this.http.get(`${environment.PATH_BASE}/${URLGETCURSOBYAGENDA}/${id}`, this.httpOptions)
                    .pipe(
                      retry(3),
                      map(result => result),
                      catchError(this.handleError)
                    );
  }
  /**
   * curso para impirmir servicio por agenda
   */
  getCursosByAgendToPrint(id: number): Observable<any> {
    return this.http.get<CursosbyId>(`${environment.PATH_BASE}/${URLGETPRINTCURSOS}/${id}`, this.httpOptions)
                     .pipe(
                      retry(3),
                      map(result => result),
                      catchError(this.handleError)
                    );
  }
  /**
   * listado de cursos vendios por agenda
   */
  async getCursosVendidos($id: string): Promise<any> {
    const response = await this.http.get(`${environment.PATH_BASE}/${URLLISTACURSOSVENDIDOS}/${$id}`, this.httpOptions)
                     .toPromise();
    return response;
  }
  /**
   * obtener un número de cursos vendidos agregados del formulario
   */
  getCursosVendidosListos(idAgenda: number): Observable<any> {
    return this.http.get<CursosbyId>(`${environment.PATH_BASE}/${URLCHECKCURSOS}/${idAgenda}`, this.httpOptions)
           .pipe(
             retry(3),
             map(result => result),
             catchError(this.handleError)
           );
  }
/**
 * TODO: modificacion de datos
 */
  sendVendidos(idA: number): Observable<any> {
    return this.http.get(`${environment.PATH_BASE}/${URLSENDBUYCOURSES}/${idA}`, this.httpOptions)
            .pipe(
              retry(3),
              map(res => res),
              catchError(this.handleError)
            );
  }
  /**
   * TODO: cursos terminados
   */
  async getCursosDone($id: string): Promise<any> {
    const res = await this.http.get(`${environment.PATH_BASE}/${URLCURSOSDONE}/${$id}`, this.httpOptions)
                     .toPromise();
    return res;
  }
  /**
   * agregar funcion que intercepta el error en caso de ocurrir
   */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('Un error ha ocurrido:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened. Please try again later.');
  }
}
