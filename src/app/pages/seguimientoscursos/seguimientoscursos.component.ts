import { Component, OnInit, Input, ViewChild } from '@angular/core';
// importar el servicio del curso
import { CursosService } from '../../services/cursos.service';
// servicio decode
import { DecodeencodeserviceService } from '../../services/decodeencodeservice.service';
// importar material table
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
// modelo
import { Cursos } from '../../models/cursos';

@Component({
  selector: 'app-seguimientoscursos',
  templateUrl: './seguimientoscursos.component.html',
  styleUrls: ['./seguimientoscursos.component.scss']
})
export class SeguimientoscursosComponent implements OnInit {
  @Input() cursoFlag;
  private flag: boolean;
  @Input() idAgendaCurso;
  // datasource
  sourceData = new MatTableDataSource<Cursos>();
  // viewchild
  @ViewChild(MatSort) sort: MatSort;
  // paginadores
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // columnas
  displayedColumns = ['curso', 'costo', 'detalle'];

  constructor(
    private cs: CursosService,
    private encodeanddecode: DecodeencodeserviceService
  ) { }

  ngOnInit() {
    this.flag = this.cursoFlag;
    if (this.flag === true) {
      const agendastr = this.encodeanddecode.b64EncodeUnicode(this.idAgendaCurso.toString());
      this.loadcursoById(agendastr);
    }
  }

  /**
   * load cursos
   */
  async loadcursoById(id: string) {
    const resultado = await this.cs.getCursobyIdAgenda(id);
    this.sourceData = resultado;
    this.sourceData.paginator = this.paginator;
    this.sourceData.sort = this.sort;
  }

}
