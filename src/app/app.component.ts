import { Component } from '@angular/core';
// importar rutas
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Event } from '@angular/router';
// auth service
import { AuthService } from './services/auth.service';
// usuario modelo
import { Usuario } from './models/user';
// loading
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Agenda';
  currentUser: Usuario;

  constructor(
    private router: Router,
    private authenticationService: AuthService,
    private loadingBar: SlimLoadingBarService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    // subscribirse a nuestros routas de eventos
    this.router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    });
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  private navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      this.loadingBar.start();
    }

    if (event instanceof NavigationEnd) {
      this.loadingBar.complete();
    }

    // poner los estados de las cargas
    if (event instanceof NavigationCancel) {
      this.loadingBar.stop();
    }

    if (event instanceof NavigationError) {
      this.loadingBar.stop();
    }
  }
}
