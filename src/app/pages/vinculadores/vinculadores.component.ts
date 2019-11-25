import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// importar titulo
import { Title } from '@angular/platform-browser';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
// importar tipo visita
import { Vinculador } from '../../models/clientes';

@Component({
  selector: 'app-vinculadores',
  templateUrl: './vinculadores.component.html',
  styleUrls: ['./vinculadores.component.scss']
})
export class VinculadoresComponent implements OnInit {
  vinculadoresx: any;
  isUpdated = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['nombre', 'numeroenlace'];

  // asignar la data a la fuente de datos para la tabla a reenderizar
  datasource = new MatTableDataSource<Vinculador>([]);

  constructor(
    private routes: Router,
    private route: ActivatedRoute,
    private Titulo: Title,
  ) { }

  ngOnInit() {
    // set titulos
    this.Titulo.setTitle('Sivic / Lista de Vinculadores');
    // vinculadorporjefe
    this.vinculadoresx = this.route.snapshot.data.getvinculadores;
    this.datasource.data = this.vinculadoresx;
    this.datasource.sort = this.sort;
    this.datasource.paginator = this.paginator;
  }

}
