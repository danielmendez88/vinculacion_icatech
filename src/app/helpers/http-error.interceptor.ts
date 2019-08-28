import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpErrorInterceptor implements  HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
        .pipe(
          retry(1), // intentos
          catchError((error: HttpErrorResponse) => {
            let errorMessage = '';
            if (error.error instanceof ErrorEvent) {
              // error del cliente
              errorMessage = `Error: ${error.error.message}`;
            } else {
              // error del lado del servidor
              errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
            }
            console.error(errorMessage);
            return throwError(errorMessage);
          }),
        );
  }
}
