import { Component, OnInit, OnDestroy } from '@angular/core';
// angular router
import { ActivatedRoute } from '@angular/router';
// importar servicio auth
import { AuthService } from '../../services/auth.service';
// importar usuario
import { Usuario } from '../../models/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  public userRole$: string;

  constructor(
    private ruta: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.userRole$ = this.ruta.snapshot.data.roldata;
  }

  ngOnDestroy(): void {
    this.userRole$ = null;
  }

}
