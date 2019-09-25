import { Component, OnInit, ViewChild, Inject, NgZone, Input } from '@angular/core';
// cursos
import { CursosService } from '../../services/cursos.service';
// modelo
import { CategoriaCursos, Cursos, CursoById } from '../../models/cursos';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
// importamos snackbar
import { SnackserviceService } from '../../services/snackservice.service';
// importar los dialogos de material
import {MatDialog} from '@angular/material/dialog';
// importar el componente
import { DialogrefviewComponent } from '../../pages/dialogrefview/dialogrefview.component';
// modelos
import { CursosArreglo } from '../../models/custom';
// servicio decode
import { DecodeencodeserviceService } from '../../services/decodeencodeservice.service';
// importar file saver
import * as FileSaver from 'file-saver';
// importar agenda service
import { AgendaService } from '../../services/agenda.service';


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
  displayedColumns = ['curso', 'costo', 'detalle', 'agregar'];
  dpColumns = ['curso', 'costo', 'detalle'];
  // datasource
  datasource = new MatTableDataSource<Cursos>();
  sourceData = new MatTableDataSource<Cursos>();
  // paginadores
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  // variable mostrar elemento
  cursoList: Array<CursosArreglo> = [];
  isinArray: boolean;
  idcurso: number;
  show = false;
  // generamos una variable para el curso por id
  private cursoById: CursoById = {
    id: 0,
    curso: '',
    especialidad: '',
    objetivo: '',
    perfilIngreso: '',
    duracion: 0,
    modalidad: '',
    clasificacion: '',
    costo: ''
  };
  // encode id
  encodeId: string;
  isLoadingResults = false;
  // panel Open state
  panelOpenState = false;
  // worker
  private pdfworker: Worker;
  // error y carga de pdf
  cargandoPdf = false;
  errorPdf = false;
  // es el elemento vacio
  isNotEmptyArray = false;
  // input
  @Input() idAgenda;
  // boolean value
  isCursoIncorporated = false;
  @Input() cursoFlag;
  // input titular
  @Input() titulartag;

  constructor(
    private serviceCourse: CursosService,
    private snack: SnackserviceService,
    private dialog: MatDialog,
    private encodeAndDecode: DecodeencodeserviceService,
    private ngz: NgZone,
    private agendas: AgendaService
  ) { }

  ngOnInit() {
    // cargamos las categorias
    this.getCategories();

    const $ngZone = this.ngz;
    const self = this;
    // funcion del worker inicializando el objecto para generar los reportes del worker
    this.pdfworker = new Worker('/assets/workers/cursos/workers.js');
    // tslint:disable-next-line:only-arrow-functions
    this.pdfworker.onmessage = function(evt) {
      $ngZone.run(() => {
        self.cargandoPdf = false;
      });
      FileSaver.saveAs( self.base64ToBlob(evt.data.base64, 'application/pdf'), evt.data.fileName );
    };
    /**
     * pdf error
     */
    // tslint:disable-next-line:only-arrow-functions
    this.pdfworker.onerror = function(e) {
      $ngZone.run(() => {
        self.errorPdf = false;
      });
    };
    /**
     * es diferente el arreglo a una longitud mayor a cero
     */
    if (this.cursoList.length === 0) {
      this.isNotEmptyArray = false;
    } else {
      this.isNotEmptyArray = true;
    }
    /**
     * cargamos todos los cursos que tenemos en la base de datos
     */
    if (this.cursoFlag === false) {
      /**
       * si es falso generas la subscripción
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
    } else {
      /**
       * si es verdadero llamamos a otra servicio y nos subscribimos
       */
      const agendastr = this.encodeAndDecode.b64EncodeUnicode(this.idAgenda.toString());
      this.loadCursoByAgenda(agendastr);
    }
  }

  /**
   * dialogo con modal component
   */
  openDialog(id): void {
    const dialogRef = this.dialog.open(DialogrefviewComponent, {
      width: '450px',
      data: {idCurso: id}
    });
  }

  /**
   * filtrar cursos
   */
  getCursoByFilter(event) {
    this.isLoadingResults = true;
    this.serviceCourse.getCursoPorCategoria(event)
        .subscribe((success) => {
          this.datasource.data = success as Cursos[];
          this.isLoadingResults = false;
        }, error => {
          this.isLoadingResults = false;
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

  // find by key
  objectFindByKey(array, key, value) {
    // tslint:disable-next-line:prefer-for-of
    for (let index = 0; index < array.length; index++) {
      if (array[index][key] === value) {
        return true;
      }
    }
    return false;
  }
  // funcion para obtener el dato seleccionado
  async selectRow(row) {
    this.isLoadingResults = true;
    this.idcurso = row;
    this.isinArray = this.objectFindByKey(this.cursoList, 'idCurso', this.idcurso);
    // si el objecto no se encuentra en el arreglo empleamos a traer un serivcio para obtener los datos
    if (this.isinArray === false) {
      this.isNotEmptyArray = true;
      // necesitamos llamar el servicio del curso que agregaremos
      const str = this.encodeAndDecode.b64EncodeUnicode(this.idcurso.toString());
      this.cursoById = await this.serviceCourse.getCursoById(str);
      // armando el arreglo
      this.cursoList.push({
        idCurso: this.cursoById[0].id,
        curso: this.cursoById[0].curso,
        costo: this.cursoById[0].costo,
        duracion: this.cursoById[0].duracion,
        clasificacion: this.cursoById[0].clasificacion
      });
      this.isLoadingResults = false;
    } else {
      this.isLoadingResults = false;
    }
  }

  /**
   * removeCurso
   */
  removeCurso(cursosi, index): void {
    this.cursoList.splice(index, 1);
    if (this.cursoList.length === 0) {
      this.isNotEmptyArray = false;
    }
  }

  /**
   * base 64 to blob
   */
  base64ToBlob(base64, type) {
    // tslint:disable-next-line:one-variable-per-declaration
    const bytes = atob(base64); const len = bytes.length;
    const buffer = new ArrayBuffer( len ); const view = new Uint8Array( buffer );
    for (let i = 0; i < len; i++) {
      // tslint:disable-next-line:no-bitwise
      view[i] = bytes.charCodeAt(i) & 0xff;
    }
    return new Blob( [ buffer ], { type } );
  }
  // imprimir documento pdf
  /**
   * esta parte del código nos permitirá imprimir un documento pdf con
   * los datos seleccionados de los cursos se imprimiran en este documento.
   */
  imprimirActa() {
    try {
      // obtenemos el usuario que tiene la sesión iniciada
      const usuarioActual = localStorage.getItem('currentUserName');
      const titular = this.titulartag;
      const datosImpresion = {
        lista: this.loadCursosByPrint(this.idAgenda),
        usuario: usuarioActual,
        titular_agenda: titular
      };
      this.pdfworker.postMessage(JSON.stringify(datosImpresion));
    } catch (error) {
      this.cargandoPdf = false;
    }
  }
  /**
   * enviar data
   */
  async sendData() {
    this.isLoadingResults = true;
    const data = await this.serviceCourse.sendCursosByAgenda(this.idAgenda, this.cursoList);
    const keys = Object.keys(data);
    if (keys[0] === 'success') {
      const strAgenda = this.encodeAndDecode.b64EncodeUnicode(this.idAgenda.toString());
      this.isLoadingResults = false;
      /**
       * vamos a hacer una consulta
       * para actualizar un componente
       * via un el servicio de la agenda
       */
      const updateValue = await this.agendas.updateIsCurso(strAgenda);
      const keysAgenda = Object.keys(updateValue);
      if (keysAgenda[0] === 'success') {
        // borrar contenido array
        this.cursoList = [];
        // actualizamos componente
        this.cursoFlag = true;
      }
    }
  }
  /**
   * load cursos
   */
  async loadCursoByAgenda(id: string) {
    const resultado = await this.serviceCourse.getCursobyIdAgenda(id);
    this.sourceData = resultado;
    this.sourceData.sort = this.sort;
  }
  /**
   * cargar cursos a imprimir
   */
  async loadCursosByPrint(id: string) {
    const response = await this.serviceCourse.getCursosByAgendToPrint(id);
    return response;
  }
 }
