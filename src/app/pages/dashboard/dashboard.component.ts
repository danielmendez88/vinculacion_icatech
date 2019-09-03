import { Component, OnInit } from '@angular/core';
// angular router
import { ActivatedRoute } from '@angular/router';
// importar servicio auth
import { AuthService } from '../../services/auth.service';
// importar usuario
import { Usuario } from '../../models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public userRole$: string;
  public userNumb = 0;

  constructor(
    private ruta: ActivatedRoute,
    private as: AuthService
  ) { }

  ngOnInit() {
    this.userRole$ = this.as.UserRoleCurrent;
    console.log(this.userRole$);
    // this.userRole = this.ruta.snapshot.data.roldata;
    if (this.userRole$ === 'Vinculador') {
      this.userNumb = 1;
    } else if (this.userRole$ === 'Directores') {
      this.userNumb = 2;
    } else {
      console.log('no es esta opciones');
    }
  }

}
