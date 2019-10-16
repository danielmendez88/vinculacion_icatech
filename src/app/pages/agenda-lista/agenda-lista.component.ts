import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { AgendaService } from '../../services/agenda.service';
// modelo de la agenda
import { Agenda } from '../../models/angendas';
// ruta activa
import { ActivatedRoute, Router } from '@angular/router';
// importar titulo
import { Title } from '@angular/platform-browser';
// importar auth service
import { AuthService } from '../../services/auth.service';
// importar el servicio de cifrado AES
import { CryptServiceService } from '../../services/crypt-service.service';


@Component({
  selector: 'app-agenda-lista',
  templateUrl: './agenda-lista.component.html',
  styleUrls: ['./agenda-lista.component.scss']
})
export class AgendaListaComponent implements OnInit {
  public estacargando: boolean;
  mode = 'indeterminate';
  Agenda;
  public idString: string;


  displayedColumns: string[] = ['fecha', 'institucion', 'tipo', 'vinculador', 'detalle'];
  // asignar la data a la fuente de datos para la tabla a reenderizar
  datasource = new MatTableDataSource<Agenda>();
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
    private route: Router
  ) { }

  ngOnInit() {
    // set titulos
    this.Titulo.setTitle('Sivic / Agendas');
    this.estacargando = false;
    // cargar el loagin
    this.Agenda = this.ruta.snapshot.data.Agendas;
    // this.getAgendas();
    this.datasource.data = this.Agenda;
    this.datasource.sort = this.sort;
    this.datasource.paginator = this.paginator;
  }
  // agendas
  getAgendas() {
    this.idString = this.auth.useridCurrent.toString();
    this.agendaList.getAllAgendas(this.idString)
                   .subscribe(res => {
                     // this.estacargando = false;
                     this.datasource.data = res as Agenda[];
                     this.estacargando = true;
                     this.estacargando = false;
                     console.log(this.estacargando);
                   },
                   (error) => {
                     console.error(error);
                     this.estacargando = false;
                   });
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

  updateAgendas() {
    try {
      // this.estacargando = true;
      // console.log(this.estacargando);
      this.getAgendas();
    } catch (error) {
      console.error(error);
    }
  }

  cargarDatos(id: number) {
    const strId = id.toString();
    const str = this.crypt.encryptUsingAES256(strId);
    this.route.navigate(['/seguimiento', str]);
    // [routerLink]="['/seguimiento', cargarDatos(row.id)]"
  }
}
