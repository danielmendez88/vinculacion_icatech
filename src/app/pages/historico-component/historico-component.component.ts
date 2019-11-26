import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
// modelo de la agenda
import { GetUserHistorical } from '../../models/angendas';
// ruta activa
import { ActivatedRoute, Router } from '@angular/router';
// importar titulo
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-historico-component',
  templateUrl: './historico-component.component.html',
  styleUrls: ['./historico-component.component.scss']
})
export class HistoricoComponentComponent implements OnInit {
  AgendaDone;

  displayedColumns: string[] = ['nombre', 'agendas', 'detalle'];
  // asignar la data a la fuente de datos para la tabla a reenderizar
  datasource = new MatTableDataSource<GetUserHistorical>([]);

  // ViewChild
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private rutas: ActivatedRoute, // rutas
    private titulo: Title,
    private route: Router,
  ) { }

  ngOnInit() {
    // set titulos
    this.titulo.setTitle('Sivic / Historico');
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

  cargarDatos(id: number) {
    const idStr = id.toString();
    const str = btoa(idStr);
    this.route.navigate(['/historicodetalle'], {queryParams: {vinculador: str}});
  }

}
