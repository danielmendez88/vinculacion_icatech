import { Component, OnInit } from '@angular/core';
// angular router
import { ActivatedRoute } from '@angular/router';
// importar servicio auth
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public userRole$: string;

  constructor(
    private ruta: ActivatedRoute,
    private as: AuthService
  ) { }

  ngOnInit() {
    this.userRole$ = this.as.UserRoleCurrent;
    console.log(this.userRole$);
    // this.userRole = this.ruta.snapshot.data.roldata;
  }

}
