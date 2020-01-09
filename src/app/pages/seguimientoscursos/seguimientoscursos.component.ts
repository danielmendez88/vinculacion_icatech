import { Component, OnInit, Input, ViewChild } from '@angular/core';
// importar el servicio del curso
import { CursosService } from '../../services/cursos.service';
// servicio decode
import { DecodeencodeserviceService } from '../../services/decodeencodeservice.service';
// importar material table
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
// modelo
import { CursoVendido, Cursos } from '../../models/cursos';
// importar el componente
import { DialogrefviewComponent } from '../dialogrefview/dialogrefview.component';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { SelectionModel } from '../../../../node_modules/@angular/cdk/collections';
// importar validadores
import { CommonValidators } from 'ng-validator';
// importar Seguimientos
import { Seguimientos } from '../../models/Seguimientos';
// importamos snackbar
import { SnackserviceService } from '../../services/snackservice.service';

@Component({
  selector: 'app-seguimientoscursos',
  templateUrl: './seguimientoscursos.component.html',
  styleUrls: ['./seguimientoscursos.component.scss']
})
export class SeguimientoscursosComponent implements OnInit {
  @Input() cursoFlag;
  public flag: boolean;
  @Input() idAgendaCurso;
  // datasource
  sourceData = new MatTableDataSource<Cursos>();
  // viewchild
  @ViewChild(MatSort) sort: MatSort;
  // paginadores
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // columnas
  displayedColumns = ['curso', 'costo', 'detalle'];
  @Input() statusAgenda;
  // formgroup
  seguimientoForm: FormGroup;
  list: any;
  breakpoint: number;
  // cursos
  // visita
  cursosModel: Seguimientos[];
  // submiteo
  submmited = false;

  // componentes de la tabla
  displayedColumnsModify: string[] = ['curso', 'costo', 'detalle'];
  dataSource = new MatTableDataSource<CursoVendido>();
  selection = new SelectionModel<CursoVendido>(true, []);

  constructor(
    private cs: CursosService,
    private encodeanddecode: DecodeencodeserviceService,
    private dialog: MatDialog,
    private fb: FormBuilder, // en el constructor inicializamos la variable del formBuilder
    private snks: SnackserviceService
  ) {}

  ngOnInit() {
    this.flag = this.cursoFlag;
    if (this.flag === true) {
      const agendastr = this.encodeanddecode.b64EncodeUnicode(this.idAgendaCurso.toString());

      if (this.statusAgenda === 5) {
        this.seguimientoForm = this.createForm(this.fb);
        // control seguimiento
        this.cursosVendidos(this.idAgendaCurso);
        this.seguimientoForm.controls.agndaId.setValue(this.idAgendaCurso);
        this.cs.getCursobyAgenda(agendastr).subscribe((res: Seguimientos[]) => {
          this.cursosModel = res;
        });
      } else {
        this.loadcursoById(agendastr);
      }
      this.breakpoint = (window.innerWidth <= 400) ? 1 : 2;
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
  /**
   * cargar cursos vendidos
   */
  async cursosVendidos(id: string) {
    const result = await this.cs.getCursosVendidos(id);
    this.dataSource = result;
    this.dataSource.paginator = this.paginator;
    const totales = result.map(t => t.numeroPersona).reduce((accum, curr) => accum + curr, 0);
    console.log(totales);
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
  // crear formulario con reactive form create form con el formgroup
  createForm(formBulder: FormBuilder) {
    return formBulder.group({
      sendTo: new FormControl(false),
      cursos: new FormControl(null, [Validators.required]),
      noPersonas: new FormControl(null, [Validators.required, CommonValidators.isNumber]),
      costo: new FormControl(null, [Validators.required]),
      agndaId: new FormControl(null),
    });
  }
  /**
   * conveniencia para un fácil acceso a los campos de formulario
   */
  get segForm() { return this.seguimientoForm.controls; }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 2;
  }

  /**
   * funcion de submiteo enviamos la información a la api para guardar los registros
   */
  onSubmitVenta(value) {
    if (this.seguimientoForm.invalid) {
      return;
    }
    /**
     * form
     */
    this.submmited = true;
    const cursoForm = new FormData();
    cursoForm.append('cursos', value.cursos);
    cursoForm.append('personas', value.noPersonas);
    cursoForm.append('costo', value.costo);
    cursoForm.append('agendaId', value.agndaId);
    // de lo contrario enviamos la informacion al servicio de carga de archivos
    this.cs.sendCursoVendidos(cursoForm).subscribe(async response => {
      this.snks.showSnackBar(JSON.stringify(response.success), 'Listo');
      this.submmited = false;
      /**
       * mostramos la información en la tabla que se tiene a lado
       */
      const respuesta = await this.cs.getCursosVendidos(value.agndaId);
      this.dataSource = respuesta;
      console.log(response);
    }, error => {
      this.snks.showSnackBar(JSON.stringify(error.error), 'Error');
      console.error(error);
    });
  }
  /**
   * función de formulario send To Api rest
   */
  onChangeData(enable: boolean) {
    if (enable === true) {
      // enviar al servidor una petición y checar que la respuesta nos esté dando un valor dado
      console.log(enable);
    } else {
      console.log(enable);
    }
  }
}
