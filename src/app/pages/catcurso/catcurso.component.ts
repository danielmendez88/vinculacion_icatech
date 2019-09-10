import { Component, OnInit, ViewChild, Inject, NgZone } from '@angular/core';
// servicio del curso
import { CursosService } from '../../services/cursos.service';
// modelo
import { CategoriaCursos, Cursos } from '../../models/cursos';
// resolve
import { ActivatedRoute } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource, MatBottomSheetRef, MatBottomSheet, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import * as FileSaver from 'file-saver';
// titulo
import { Title } from '@angular/platform-browser';
// servicio spinner
import { SpinnerServiceService } from '../../services/spinner-service.service';
// modelos
import { CursosArreglo } from '../../models/custom';
// selection model
import {SelectionModel} from '@angular/cdk/collections';

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
  // error en el pdf
  cargandoPdf = false;
  errorPDF = false;
  // columnas
  displayedColumns = ['select', 'id', 'curso', 'clasificacion', 'costo', 'detalle'];
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
  constructor(private Curso: CursosService, private router: ActivatedRoute, private btnsheet: MatBottomSheet, private ngz: NgZone, private titulo: Title, private spinnerService: SpinnerServiceService) {  }

  ngOnInit() {
    this.titulo.setTitle('Icatech / Cursos');
    this.cursoAll = this.router.snapshot.data.getAllCursos;
    this.getCategories();
    const $ngZone = this.ngz;
    const self = this;
    // this.getAllCursos();
    // si el usuario cambia el orden de la fuente, envialo a la primera página
    // this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.datasource.data = this.cursoAll;
    this.datasource.sort = this.sort;
    this.datasource.paginator = this.paginator;
    // función del worker inicializamos el objeto para generar los reportes con webworkers
    this.pdfWorker = new Worker('/assets/workers/cursos/workers.js'); // !importante
    // tslint:disable-next-line:only-arrow-functions
    this.pdfWorker.onmessage = function( evt ) {
      $ngZone.run(() => {
        console.log(evt);
        self.cargandoPdf = false;
      });

      FileSaver.saveAs( self.base64ToBlob( evt.data.base64, 'application/pdf' ), evt.data.fileName );
    };
    // pdf error
    // tslint:disable-next-line:only-arrow-functions
    this.pdfWorker.onerror = function(e) {
      $ngZone .run(() => {
        console.log(e);
        self.errorPDF = false;
      });
    };
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
  // funcion que genera la vista de la hoja abajo
  openBottomSheet(id, objetivo): void {
    this.btnsheet.open(BottomSheet, {
      data: { comisionId: id, objetivos: objetivo}
    });
  }
  // imprimir documento pdf
  /**
   * esta parte del código nos permitirá imprimir un documento pdf con
   * los datos seleccionados de los cursos se imprimiran en este documento.
   */
  imprimirActa() {
    try {
      const usuarioActual = localStorage.getItem('currentUserName');
      this.cargandoPdf = true;
      const datosImprimir = {
        lista: this.emptyList,
        usuario: usuarioActual
      };
      console.log(JSON.stringify(datosImprimir));
      this.pdfWorker.postMessage(JSON.stringify(datosImprimir));
    } catch (e) {
      this.cargandoPdf = false;
      console.log(e);
    }
  }

  //
  base64ToBlob(base64, type) {
    // tslint:disable-next-line:one-variable-per-declaration
    const bytes = atob(base64); const len = bytes.length;
    const buffer = new ArrayBuffer( len ); const view = new Uint8Array( buffer );
    for ( let i = 0 ; i < len ; i++ ) {
      // tslint:disable-next-line:no-bitwise
      view[i] = bytes.charCodeAt(i) & 0xff;
    }
    return new Blob( [ buffer ], { type } );
  }

  // funcion para obtener el dato seleccionado
  selectRow(row) {
    this.idcurso = row.id;
    this.duracion = row.duracion;
    this.curso = row.curso;
    this.costo = row.costo;
    this.clasificacion = row.clasificacion;
    // buscar elemento en el array
    // tslint:disable-next-line:triple-equals
    this.isinArray = this.objectFindByKey(this.emptyList, 'id', row.id);
    if (this.isinArray === false) {
      // tslint:disable-next-line:max-line-length
      this.emptyList.push({idCurso: this.idcurso, curso: this.curso, costo: this.costo, duracion: this.duracion, clasificacion: this.clasificacion });
    }
  }

  objectFindByKey(array, key, value) {
    // tslint:disable-next-line:prefer-for-of
    for (let index = 0; index < array.length; index++) {
      if (array[index][key] === value) {
        return true;
      }
    }
    return false;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.datasource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.datasource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Cursos): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
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
