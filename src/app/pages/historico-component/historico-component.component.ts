import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
// modelo de la agenda
import { Agenda } from '../../models/angendas';
// ruta activa
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-historico-component',
  templateUrl: './historico-component.component.html',
  styleUrls: ['./historico-component.component.scss']
})
export class HistoricoComponentComponent implements OnInit {
  AgendaDone;

  displayedColumns: string[] = ['vista', 'institucion', 'fecha', 'tipoAgenda'];
  // asignar la data a la fuente de datos para la tabla a reenderizar
  datasource = new MatTableDataSource<Agenda>();

  // ViewChild
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private rutas: ActivatedRoute // rutas
  ) { }

  ngOnInit() {
    this.AgendaDone = this.rutas.snapshot.data.historico;
    // this.getAgendas();
    this.datasource.data = this.AgendaDone;
    this.datasource.sort = this.sort;
    this.datasource.paginator = this.paginator;
  }

  // aplicar filtro
  applyFilter(filterValue: string) {
    this.datasource.filter = filterValue.trim().toLowerCase();
    if (this.datasource.paginator) {
      this.datasource.paginator.firstPage();
    }
  }

}
