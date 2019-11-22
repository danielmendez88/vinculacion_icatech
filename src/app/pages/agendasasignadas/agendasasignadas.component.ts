import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from 'node_modules/@angular/material';
// modelo de la agenda
import { Agenda } from '../../models/angendas';
// importar titulo
import { Title } from '@angular/platform-browser';
// importar agenda
import { AgendaService } from '../../services/agenda.service';
// importar active router
import { ActivatedRoute, Router } from '@angular/router';
// importar el servicio de cifrado AES
import { CryptServiceService } from '../../services/crypt-service.service';

@Component({
  selector: 'app-agendasasignadas',
  templateUrl: './agendasasignadas.component.html',
  styleUrls: ['./agendasasignadas.component.scss']
})
export class AgendasasignadasComponent implements OnInit {
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
    this.Titulo.setTitle('Sivic / Lista de seguimiento');
    this.Agenda = this.ruta.snapshot.data.asignados;
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
    const strId = id.toString();
    const str = this.crypt.encryptUsingAES256(strId);
    this.route.navigate(['/seguimiento'], {queryParams: {agenda: str}});
    // [routerLink]="['/seguimiento', cargarDatos(row.id)]"
  }

}
