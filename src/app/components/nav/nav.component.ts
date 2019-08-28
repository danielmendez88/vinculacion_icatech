import { Component, OnInit, ViewChild } from '@angular/core';
// importar interface
import { Route } from '../../models/route';
// rutas
import { Router } from '@angular/router';
// importamos el servicio
import { NavserviceService } from '../../services/navservice.service';

// declaramos
export const clientRoutes: Route[] = [
  {
    icon: 'dashboard',
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
  {
    icon: 'calendar_today',
    route: '/calendario',
    title: 'Calendario'
  },
  {
    icon: 'list',
    route: '/listaagenda',
    title: 'Lista Agenda'
  }
];

export const clientGeneral: Route[] = [
  {
    icon: 'description',
    route: '/cursos',
    title: 'Cursos'
  }
];

export const clientHistorical: Route[] = [
  {
    icon: 'history',
    route: '/historico',
    title: 'Historico'
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
  public isCollapse: true;

  constructor(private router: Router, public navser: NavserviceService) {
    this.navser.nav = this.appDrawer;
  }

  ngOnInit() {
    this.menuItems = clientRoutes.filter(items => items);
    this.clientItems = clientGeneral.filter(item => item);
    this.historicalItems = clientHistorical.filter(item => item);
    this.router.events.subscribe((event) => {
      this.isCollapse = true;
    });
  }

  get usuario(): any {
    return localStorage.getItem('currentUserName');
  }
}
