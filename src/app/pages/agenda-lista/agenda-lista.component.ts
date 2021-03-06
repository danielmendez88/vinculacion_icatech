import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { AgendaService } from '../../services/agenda.service';
// modelo de la agenda
import { GetUserwithAgenda } from '../../models/angendas';
// ruta activa
import { ActivatedRoute, Router } from '@angular/router';
// importar titulo
import { Title } from '@angular/platform-browser';
// importar auth service
import { AuthService } from '../../services/auth.service';
// importar el servicio de cifrado AES
import { CryptServiceService } from '../../services/crypt-service.service';
// locacion
import { Location } from '@angular/common';


@Component({
  selector: 'app-agenda-lista',
  templateUrl: './agenda-lista.component.html',
  styleUrls: ['./agenda-lista.component.scss']
})
export class AgendaListaComponent implements OnInit {
  mode = 'indeterminate';
  Agenda;
  public idString: number;
  isUpdated =  false;


  displayedColumns: string[] = ['nombre', 'agendas', 'detalle'];
  // asignar la data a la fuente de datos para la tabla a reenderizar
  datasource = new MatTableDataSource<GetUserwithAgenda>([]);
  //
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  // modificamos la agenda

  constructor(
    private agendaList: AgendaService,
    private ruta: ActivatedRoute,
    private Titulo: Title,
    private auth: AuthService,
    private crypt: CryptServiceService,
    private route: Router,
    private $location: Location
  ) { }

  ngOnInit() {
    // set titulos
    this.Titulo.setTitle('Sivic / Agendas');
    // cargar el loagin
    this.Agenda = this.ruta.snapshot.data.AgendaLista;
    // this.getAgendas();
    this.datasource.data = this.Agenda;
    this.datasource.sort = this.sort;
    this.datasource.paginator = this.paginator;
  }

  /**
   * aplicar filtros
   */
  applyFilter(filterValue: string) {
    this.datasource.filter = filterValue.trim().toLowerCase();
    if (this.datasource.paginator) {
      this.datasource.paginator.firstPage();
    }
  }

  onRenewSubmit(): void {
    this.isUpdated = true;
    this.idString = this.auth.useridCurrent;
    if (this.isUpdated === true) {
      this.agendaList.getVinculadorAgenda(this.idString)
      .subscribe(response => {
        this.datasource.data = response as GetUserwithAgenda[];
        this.datasource.sort = this.sort;
        this.datasource.paginator = this.paginator;
        this.isUpdated = false;
      }, error => {
        console.log(error);
      });
    }
  }

  cargarDatos(id: number) {
    const strId = id.toString();
    const str = btoa(strId);
    this.route.navigate(['/agendasasignadas', str]);
    // [routerLink]="['/seguimiento', cargarDatos(row.id)]"
  }

  backClicked() {
    this.$location.back();
  }
}
