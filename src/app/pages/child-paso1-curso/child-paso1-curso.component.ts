import { Component, OnInit, ViewChild } from '@angular/core';
// cursos
import { CursosService } from '../../services/cursos.service';
// modelo
import { CategoriaCursos, Cursos } from '../../models/cursos';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
// importamos snackbar
import { SnackserviceService } from '../../services/snackservice.service';


@Component({
  selector: 'app-child-paso1-curso',
  templateUrl: './child-paso1-curso.component.html',
  styleUrls: ['./child-paso1-curso.component.scss']
})
export class ChildPaso1CursoComponent implements OnInit {
  // checamos la variable
  catCurso: CategoriaCursos[];
  cursos: Cursos[];
   // columnas
  displayedColumns = ['curso', 'costo', 'detalle'];
  // datasource
  datasource = new MatTableDataSource<Cursos>();
  // paginadores
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  // variable mostrar elemento
  show = false;

  constructor(
    private serviceCourse: CursosService,
    private snack: SnackserviceService) { }

  ngOnInit() {
    // cargamos las categorias
    this.getCategories();
    /**
     * cargamos todos los cursos que tenemos en la base de datos
     */
    this.serviceCourse.getAllCursos().subscribe(
      response => {
      // llemamos la tabla
      this.datasource.data = response;
      this.datasource.sort = this.sort;
      this.datasource.paginator = this.paginator;
    }, error => {
      // mandamos un mensaje de error
      this.snack.showSnackBar(error, 'Error!');
    });
  }

  // filtrar cursos
  getCursoByFilter(event) {
    this.show = true;
    this.serviceCourse.getCursoPorCategoria(event)
        .subscribe((success) => {
          this.datasource.data = success as Cursos[];
          this.show = false;
        }, error => {
          this.show = false;
          this.snack.showSnackBar(error, 'Error!');
        });
  }
  
  // obtener categorias
  getCategories(): void {
    this.serviceCourse.getCatCurso()
        .subscribe
        ((respose: CategoriaCursos[]) => {
            this.catCurso = respose;
        });
  }

  // filtro
  applyFilter(filterValue: string) {
    this.datasource.filter = filterValue.trim().toLowerCase();
  }
}
