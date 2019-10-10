import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
// importamos service auth
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class CountagendaService implements Resolve<number> {
    // constructor
    constructor(
        private auth: AuthService
    ) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): number | Observable<number> {
        return this.auth.useridCurrent;
    }
}
