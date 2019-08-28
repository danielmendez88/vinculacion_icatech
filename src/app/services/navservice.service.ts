import { Injectable, EventEmitter } from '@angular/core';
// importando rutas
import { Event, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class NavserviceService {
  // declaramos la variable del nav
  public nav: any;
  // actual url
  public currentUrl = new BehaviorSubject<string> (undefined);

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.next(event.urlAfterRedirects);
      }
    });
  }

  /**
   * closeNav -- metodo de cierre
   */
  public closeNav() {
    this.nav.close();
  }

  /**
   * openNav -- metodo de apertura
   */
  public openNav() {
    this.nav.open();
  }
}
