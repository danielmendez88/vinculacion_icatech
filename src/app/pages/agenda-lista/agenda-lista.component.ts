import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { AgendaService } from '../../services/agenda.service';
// modelo de la agenda
import { Agenda } from '../../models/angendas';
// ruta activa
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-agenda-lista',
  templateUrl: './agenda-lista.component.html',
  styleUrls: ['./agenda-lista.component.scss']
})
export class AgendaListaComponent implements OnInit {
  isLoading = true;
  mode = 'indeterminate';
  Agenda;

  displayedColumns: string[] = ['fecha', 'institucion', 'titular', 'tipo', 'detalle'];
  // asignar la data a la fuente de datos para la tabla a reenderizar
  datasource = new MatTableDataSource<Agenda>();
  //
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  // modificamos la agenda

  constructor(private agendaList: AgendaService, private ruta: ActivatedRoute) { }

  ngOnInit() {
    this.Agenda = this.ruta.snapshot.data.Agendas;
    // this.getAgendas();
    this.datasource.data = this.Agenda;
    this.datasource.sort = this.sort;
    this.datasource.paginator = this.paginator;
  }
  // agendas
  // getAgendas() {
  //   this.agendaList.getAllAgendas()
  //                  .subscribe(res => {
  //                    this.isLoading = false;
  //                    this.datasource.data = res as Agenda[];
  //                    console.log(res);
  //                  },
  //                  error => this.isLoading = false
  //                 );
  // }

  /**
   * aplicar filtros
   */
  applyFilter(filterValue: string) {
    this.datasource.filter = filterValue.trim().toLowerCase();
    if (this.datasource.paginator) {
      this.datasource.paginator.firstPage();
    }
  }
}
