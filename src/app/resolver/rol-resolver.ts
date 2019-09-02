import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service'; // importar auth service
import { Injectable } from '@angular/core';

@Injectable()
export class RolResolver implements Resolve<string> {
    // constructor
    constructor(private auth: AuthService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): string | Observable<string> {
        return this.auth.UserRoleCurrent;
    }
}
