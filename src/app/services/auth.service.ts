import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// enviroment
import { environment } from '../../environments/environment';
// router
import { Router } from '@angular/router';
// rxjs
import { BehaviorSubject, Observable, of } from 'rxjs';
// modelos
import { Usuario } from '../models/user';
// modelos de rxjs
import { map, catchError } from 'rxjs/operators';
// agregar modelo token

// constante
const URL = 'login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<Usuario>;
  public currentUser: Observable<Usuario>;
  token: any;
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser: string;
  private adminBody: string;
  private adscription: string;
  private currentId: string;
  private roles: any;
  private currentUserRole: BehaviorSubject<string>;
  authToken: any;

  // damos permisos a las opciones http
  private httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      // tslint:disable-next-line:object-literal-key-quotes
      'Accept': 'application/json',
      // tslint:disable-next-line:object-literal-key-quotes
      // 'Authorization': 'Bearer ' + this.getToken()
    })
  };

  constructor(private httpclient: HttpClient, private route: Router) {
    this.currentUserSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.currentUserRole = new BehaviorSubject<string>(JSON.parse(localStorage.getItem('currentRol')));
  }

  // obtenemos el valor del usuario actual
  public get currentUserValue(): Usuario {
    return this.currentUserSubject.value;
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

  // login del usuario
  login(numeroEnlace: string, passcode: string): Observable<boolean> {
    return this.httpclient.post<any>(`${ environment.PATH_BASE }/${ URL }`, {numeroEnlace, passcode}, this.httpOptions)
    .pipe(map(datos => {
      if (datos && datos.success.token) {
        this.authToken = datos.success.token;
        this.loggedUser = datos.usuario.nombre;
        this.roles = datos.usuario.rol;
        this.adminBody = datos.usuario.administrative_id;
        this.adscription = datos.usuario.adscription_id;
        this.currentId = datos.usuario.id;
        localStorage.setItem('auth_token', this.authToken);
        localStorage.setItem('currentUser', JSON.stringify(datos));
        // mandamos también el valor del administrative_id adscription_id
        localStorage.setItem('currentcuerpoAdministrativo', this.adminBody);
        localStorage.setItem('currentAdscripcion', this.adscription);
        localStorage.setItem('currentUserId', this.currentId);
        localStorage.setItem('currentRol', JSON.stringify(this.roles));
        localStorage.setItem('currentUserName', this.loggedUser);
        this.currentUserSubject.next(datos);
        this.currentUserRole.next(localStorage.getItem('currentRol'));
      }
      return datos;
    }));
  }

  // salir de la sesión
  logout() {
    // quitar al usuario del almacenamiento local y cerrar sesión
    localStorage.removeItem('currentUser');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('currentcuerpoAdministrativo');
    localStorage.removeItem('currentAdscripcion');
    localStorage.removeItem('currentUserId');
    localStorage.removeItem('currentUserName');
    localStorage.removeItem('currentRol');
    this.currentUserSubject.next(null);
    this.route.navigate(['/']);
  }

  getToken(): string {
    return localStorage.getItem('auth_token');
  }

  getadministrative(): string {
    return localStorage.getItem('currentcuerpoAdministrativo');
  }
   // get adscription
   getadscription(): string {
     return localStorage.getItem('currentAdscripcion');
   }
   // get currentUser
   getCurrentUser(): string {
     return localStorage.getItem('currentUserId');
   }
   // get current user rol
   get UserRoleCurrent(): string {
     return JSON.parse(localStorage.getItem('currentRol'));
   }

   // get current user id
   get useridCurrent(): number {
     return JSON.parse(localStorage.getItem('currentUserId'));
   }

   // tiene roles
   hasRoles(roles: string[]): boolean {
     for ( const oneRole of roles) {
       if (!this.currentUserSubject || !this.currentUserSubject.value.rol.includes(oneRole)) {
         return false;
       }
     }
     return true;
   }
   // rol match method
   roleMatch(allowedRoles): boolean {
     let isMatch = false;
     const userRoleStr: string[] = JSON.parse(localStorage.getItem('currentRol'));
     allowedRoles.forEach(element => {
       if (userRoleStr.indexOf(element) > -1) {
         isMatch = true;
         return false;
       }
     });
     return isMatch;
   }
}
