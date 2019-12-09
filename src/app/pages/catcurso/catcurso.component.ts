import { Component, OnInit, ViewChild, Inject, NgZone } from '@angular/core';
// servicio del curso
import { CursosService } from '../../services/cursos.service';
// modelo
import { CategoriaCursos, Cursos } from '../../models/cursos';
// resolve
import { ActivatedRoute } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource, MatBottomSheetRef,
  MatBottomSheet, MAT_BOTTOM_SHEET_DATA, MatDialog } from '@angular/material';
import * as FileSaver from 'file-saver';
// titulo
import { Title } from '@angular/platform-browser';
// servicio spinner
import { SpinnerServiceService } from '../../services/spinner-service.service';
// modelos
import { CursosArreglo } from '../../models/custom';
// selection model
import {SelectionModel} from '@angular/cdk/collections';
// importar el componente
import { DialogrefviewComponent } from '../dialogrefview/dialogrefview.component';

@Component({
  selector: 'app-catcurso',
  templateUrl: './catcurso.component.html',
  styleUrls: ['./catcurso.component.scss']
})
export class CatcursoComponent implements OnInit {
  // checamos la variable
  catCurso: CategoriaCursos[];
  cursos: Cursos[];
  cursoAll;
  show = false; // variable booleana
  // columnas
  displayedColumns = ['curso', 'modalidad', 'clasificacion', 'costo', 'detalle'];
  // datasource
  datasource = new MatTableDataSource<Cursos>();
  // paginadores
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  // inicializar el worker
  private pdfWorker: Worker;
  // array vacio
  emptyList: Array<CursosArreglo> = [];
  duracion: number;
  curso: string;
  costo: string;
  clasificacion: string;
  isinArray: boolean;
  idcurso: number;
  // seleccion
  selection = new SelectionModel<Cursos>(true, []);
  // tslint:disable-next-line:max-line-length
  constructor(
    private Curso: CursosService,
    private router: ActivatedRoute,
    private btnsheet: MatBottomSheet,
    private ngz: NgZone,
    private titulo: Title,
    public spinnerService: SpinnerServiceService,
    private dialog: MatDialog,
  ) {  }

  ngOnInit() {
    this.titulo.setTitle('Icatech / Cursos');
    this.cursoAll = this.router.snapshot.data.getAllCursos;
    this.getCategories();
    // this.getAllCursos();
    // si el usuario cambia el orden de la fuente, envialo a la primera página
    // this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.datasource.data = this.cursoAll;
    this.datasource.sort = this.sort;
    this.datasource.paginator = this.paginator;
  }

  getCategories(): void {
    this.Curso.getCatCurso()
        .subscribe((res: CategoriaCursos[]) => {
          this.catCurso = res;
        });
  }

  // evento de filtros por
  getCursosby(event) {
    this.show = true;
    this.Curso.getCursoPorCategoria(event)
        .subscribe((success) => {
          this.datasource.data = success as Cursos[];
          this.show = false;
        },
        error => {
          this.show = false;
          console.error(error);
        }
      );
  }

  // getAllCursos(): void {
  //   this.Curso.getAllCursos()
  //       .subscribe((res: Cursos[]) => {
  //         this.cursos = res;
  //       });
  // }
  // filtro
  applyFilter(filterValue: string) {
    this.datasource.filter = filterValue.trim().toLowerCase();
  }
  // genera la vista

  /**
   * dialogo con modal component
   */
  openDialog(id): void {
    const dialogRef = this.dialog.open(DialogrefviewComponent, {
      width: '450px',
      data: {idCurso: id}
    });
  }
  // imprimir documento pdf

  objectFindByKey(array, key, value) {
    // tslint:disable-next-line:prefer-for-of
    for (let index = 0; index < array.length; index++) {
      if (array[index][key] === value) {
        return true;
      }
    }
    return false;
  }

}

/**
 * exportar la clase bottomsheetOverview
 */
@Component({
  selector: 'app-catcurso',
  templateUrl: './bottom-sheet.component.html'
})

// tslint:disable-next-line:component-class-suffix
export class BottomSheet {
  constructor(private bottomSheetRef: MatBottomSheetRef<BottomSheet>, @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {}
}
