import { Component, OnInit, OnDestroy } from '@angular/core';
// angular router
import { ActivatedRoute } from '@angular/router';
// importar servicio auth
import { AuthService } from '../../services/auth.service';
// importar usuario
import { Usuario } from '../../models/user';
import { Observable } from 'rxjs';
// importar titulo
import { Title } from '@angular/platform-browser';
// importamos el servicio countagendaservice
import { CountagendaserviceService } from '../../services/countagendaservice.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  public userRole$: string;
  public userId$: number;
  public resultCount: number | null;
  public resultCountSeguimiento: number | null;
  public resultCountTerminado: number | null;

  constructor(
    private ruta: ActivatedRoute,
    private titulo: Title,
    private uath: AuthService,
    private agendaCount: CountagendaserviceService
  ) { }

  ngOnInit() {
    this.titulo.setTitle('Sivic / Tablero de Inicio');
    this.userRole$ = this.ruta.snapshot.data.roldata;
    this.userId$ = this.ruta.snapshot.data.currentid;
    this.countData(this.userRole$, this.userId$);
    this.countDataSeguimiento(this.userRole$, this.userId$);
    this.countDataTerminado(this.userRole$, this.userId$);
  }

  ngOnDestroy(): void {
    this.userRole$ = null;
    this.userId$ = null;
  }

  countData(Role$: string, id$: number) {
    this.agendaCount.getallagendas(Role$, id$).then(
      (result) => {
        this.resultCount = result;
      }
    );
  }

  countDataSeguimiento(rol$: string, currentId$: number) {
    this.agendaCount.getagendasseguimiento(rol$, currentId$).then(
      (res) => {
        this.resultCountSeguimiento = res;
      }
    )
  }

  countDataTerminado(rol$: string, currentId$: number) {
    this.agendaCount.getagendasterminadas(rol$, currentId$).then(
      (response) => {
        this.resultCountTerminado = response;
      }
    )
  }
}
