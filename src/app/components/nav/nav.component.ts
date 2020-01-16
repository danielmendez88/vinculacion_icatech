import { Component, OnInit, ViewChild } from '@angular/core';
// importar interface
import { Route } from '../../models/route';
// rutas
import { Router } from '@angular/router';
// importamos el servicio
import { NavserviceService } from '../../services/navservice.service';
// importar auth service
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

// declaramos los elementos del menu
export const vinculadorRoutes: Route[] = [
  {
    icon: 'dashboard',
    route: '/index',
    title: 'Tablero'
  },
  {
    icon: 'calendar_today',
    route: '/calendario',
    title: 'Calendario'
  },
  {
    icon: 'library_books',
    route: '/historicovinculador',
    title: 'Historico'
  }
];
export const clientRoutes: Route[] = [
  {
    icon: 'view_quilt',
    route: '/index',
    title: 'Tablero'
  },
  {
    icon: 'assignment',
    route: '/agenda',
    title: 'Agenda'
  },
  // {
  //   icon: 'contacts',
  //   route: '/index',
  //   title: 'contactos'
  // },
  // {
  //   icon: 'calendar_today',
  //   route: '/calendario',
  //   title: 'Calendario'
  // },
  {
    icon: 'list',
    route: '/listaagenda',
    title: 'Lista Agenda'
  },
  {
    icon: 'history',
    route: '/historico',
    title: 'Historico'
  },
  {
    icon: 'business',
    route: '/catclientes',
    title: 'Cliente Local'
  }
];

export const clientGeneral: Route[] = [
  {
    icon: 'description',
    route: '/cursos',
    title: 'Cursos'
  }
];

export const clientAdministrador: Route[] = [
  {
    icon: 'view_quilt',
    route: '/index',
    title: 'tablero'
  }
];

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  // viewchild
  @ViewChild('sidenav') public appDrawer;
  // declaramos un arreglo
  public menuItems: any[];
  public clientItems: any[];
  public historicalItems: any[];
  public vinculadorItems: any[];
  public isCollapse: boolean;
  Role$: string; // observable
  public menuItemsAdmin: any[];

  constructor(private router: Router, public navser: NavserviceService, private as: AuthService) {
    this.navser.nav = this.appDrawer;
  }

  ngOnInit() {
    this.Role$ = this.as.UserRoleCurrent;
    this.menuItems = clientRoutes.filter(items => items);
    this.menuItemsAdmin = clientAdministrador.filter(itemss => itemss);
    this.clientItems = clientGeneral.filter(item => item);
    this.vinculadorItems = vinculadorRoutes.filter(res => res);
    this.router.events.subscribe((event) => {
      this.isCollapse = true;
    });
  }

  get usuario(): any {
    return localStorage.getItem('currentUserName');
  }
}
