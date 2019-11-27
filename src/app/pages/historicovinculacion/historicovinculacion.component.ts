import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Agenda } from '../../models/angendas';
import { Title } from '@angular/platform-browser';
import { AgendaService } from '../../services/agenda.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CryptServiceService } from '../../services/crypt-service.service';

@Component({
  selector: 'app-historicovinculacion',
  templateUrl: './historicovinculacion.component.html',
  styleUrls: ['./historicovinculacion.component.scss']
})
export class HistoricovinculacionComponent implements OnInit {
  Agenda;
  displayedColumns: string[] = ['institucion', 'tipo', 'fecha', 'titular', 'detalle'];
  // asignar la data a la fuente de datos para la tabla a reenderizar
  datasource = new MatTableDataSource<Agenda>([]);
  // asignar viewchilds
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  // modificamos la agenda

  constructor(
    private Titulo: Title,
    private aservice: AgendaService,
    private ruta: ActivatedRoute,
    private route: Router,
    private crypt: CryptServiceService,
  ) { }

  ngOnInit() {
    // set titulos
    this.Titulo.setTitle('Sivic / Historicos');
    this.Agenda = this.ruta.snapshot.data.getdetallevinculador;
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

  cargarDatos(id: number) {
    const idStr = id.toString();
    const str = this.crypt.encryptUsingAES256(idStr);
    this.route.navigate(['/detalle'], {queryParams: {agenda: str}});
    // [routerLink]="['/seguimiento', cargarDatos(row.id)]"
  }

}
