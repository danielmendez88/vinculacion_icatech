import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler } from 'node_modules/@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
// importar service spinner
import { SpinnerServiceService } from '../services/spinner-service.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {

  constructor(private spinnerserve: SpinnerServiceService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinnerserve.show();
    return next
           .handle(req)
           .pipe(
             tap((event: HttpEvent<any>) => {
               if (event instanceof HttpRequest) {
                 this.spinnerserve.hide();
               }
             }, (error) => {
               this.spinnerserve.hide();
             })
           );
  }
}
