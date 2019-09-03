import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;
    // verificamos que el usuario esté logueado
    if (currentUser) {
      const roles = route.data.roles as Array<string>;
      if (roles) {
        const match = this.authenticationService.roleMatch(roles);
        if (match) {
          return true;
        } else {
          this.router.navigate(['/forbidden']);
          return false;
        }
      }
      // sesión iniciada así que devuelve verdadero
      return true;
    }
    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url }});
    return false;
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authenticationService.getToken()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
