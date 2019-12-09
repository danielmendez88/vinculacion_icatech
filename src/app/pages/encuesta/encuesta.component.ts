import { Component, OnInit, Input, EventEmitter, Output, AfterContentChecked, NgZone } from '@angular/core';
// modelo e interface agendas detalles
import { AgendaDetails } from '../../models/agendaDetails';
// forms
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
// importar encuesta service
import { CuestionariodncService } from '../../services/cuestionariodnc.service';
// agregar snackbar
import { SnackserviceService } from '../../services/snackservice.service';
// servicio compartido
import { CuestionarioSharedService } from '../../services/cuestionario-shared.service';
// importar model
import { DncModel } from '../../models/dncmodel';
// importar filesaver
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.scss']
})
export class EncuestaComponent implements OnInit, AfterContentChecked {
  // pasar el dato a un componente anidado
  @Input() datosEncuesta;
  // agendaDetails
  detallesEncuesta: AgendaDetails;
  // formulario de dnc
  dncForm: FormGroup;
  // varible de bandera para saber si ha sido enviado el valor
  submitted = false;
  // obtener la variable de tipo de sector
  tipoSector: number;
  sector: number;
  // es dnc
  isdnc: number;
  // idagenda
  idAgendas: number;
  dncactivity = 1;
  // cargando
  loading = false;
  cursoTrabajo: string;
  // pasamos el decorador output
  @Output() dncActive = new EventEmitter();
  // nuevo output
  @Output() dncGubernamental = new EventEmitter();
  // generamos el modelo
  DNCmodelo: any = [];
  // declarar worker
  private pdfWorker: Worker;
  // declarar worker cuestionario dnc
  private pdfWorkerSocial: Worker;
  // error pdf y cargando pdf
  cargandoPdf = false;
  errorPdf = false;
  // error y carga de pdf social
  cargandoPdfSocial = false;
  errorPdfSocial = false;
  // id Agenda
  idAgenda: number;
  // salidas del decorador output
  @Output() dncGubernamentalEmpty = new EventEmitter();
  // salidas para el decorador dncsocial vacio
  @Output() dncActiveEmpty = new EventEmitter();

  constructor(
    private fbuilder: FormBuilder,
    private dncCuestionario: CuestionariodncService,
    private snack: SnackserviceService,
    private sharedService: CuestionarioSharedService,
    private ngz: NgZone,
  ) {}

  ngOnInit() {
    this.detallesEncuesta = this.datosEncuesta;
    this.tipoSector = this.datosEncuesta.tipo;
    this.isdnc = this.datosEncuesta.isdnc;
    this.idAgendas = this.datosEncuesta.id;
    if (this.tipoSector === 1 || this.tipoSector === 2) {
      this.sector = 1;
      this.dncForm = this.formularioDnc(this.fbuilder);
    } else {
      this.sector = 2;
      this.dncForm = this.formularioDncSocial(this.fbuilder);
    }

    /**
     * validamos si el isdnc es igual a cero
     * de ser así procedemos a utilizar el método
     */
    if (this.isdnc === 1) {
      this.idAgenda = +this.idAgendas;
      this.getFromApi(this.idAgenda);
    }
    /**
     * web workers para imprimir el cuestionario
     * Inicializamos el objeto para los reportes con web Webworkers
     */
    this.pdfWorker = new Worker('/assets/workers/dnc/workerdnc.js');
    this.pdfWorkerSocial = new Worker('/assets/workers/dnc/workerdncSocial.js');
    const $ngZone = this.ngz;
    const self = this;
    // tslint:disable-next-line:only-arrow-functions
    this.pdfWorker.onmessage = function( evt ) {
      // Esto es un hack porque estamos fuera de contexto dentro del worker
      $ngZone.run(() => {
        self.cargandoPdf = false;
      });

      // file saver
      FileSaver.saveAs(self.base64ToBlob( evt.data.base64, 'application/pdf'), evt.data.fileName);
    };
    // pdf error
    // tslint:disable-next-line:only-arrow-functions
    this.pdfWorker.onerror = function(e) {
      $ngZone.run(() => {
        self.snack.showSnackBar(JSON.stringify(e), 'Error');
        self.errorPdf = false;
      });
    };
    /**
     * pdf social
     */
    // tslint:disable-next-line:only-arrow-functions
    this.pdfWorkerSocial.onmessage = function( event ) {
      // esto es un hack porque estamos fuera del contexto del worker
      $ngZone.run(() => {
        self.cargandoPdfSocial = false;
      });
      // file saver
      FileSaver.saveAs(self.base64ToBlob( event.data.base64, 'application/pdf'), event.data.fileName);
    };
    // pdf social
    // tslint:disable-next-line:only-arrow-functions
    this.pdfWorkerSocial.onerror = function(e) {
      $ngZone.run(() => {
        self.snack.showSnackBar(JSON.stringify(e), 'Error');
        self.errorPdfSocial = false;
      });
    };
  }

  formularioDnc(formB: FormBuilder) {
    return formB.group({
      cursoinduccion: new FormControl('', Validators.required),
      planCapacitacion: new FormControl('', Validators.required),
      chCapacitado: new FormControl('', Validators.required),
      cursosCapitalHumano: new FormControl('', Validators.required),
      ultimoCurso: new FormControl('', Validators.required),
      temaUltimoCurso: new FormControl('', Validators.required),
      resultadoEsperado: new FormControl('', Validators.required),
      cursoInteresActual: new FormControl('', Validators.required),
      porqueCursoActual: new FormControl('', Validators.required),
      horasDisponibleCapacitacionHumano: new FormControl('', Validators.required),
      horarioDisponibleCapacitacionHumano: new FormControl('', Validators.required),
      gradoEstudioPrimaria: new FormControl('', Validators.required),
      gradoEstudioSecundaria: new FormControl('', Validators.required),
      gradoEstudioBachillerato: new FormControl('', Validators.required),
      gradoEstudioLicenciatura: new FormControl('', Validators.required),
      gradoEstudioPostgrado: new FormControl('', Validators.required),
      dnctype: new FormControl(''),
      idAgenda: new FormControl(''),
    });
  }

  /**
   * formulario social
   */
  formularioDncSocial(fS: FormBuilder) {
    return fS.group({
      curso_capacitacion_desmpenio_trabajo: new FormControl('', Validators.required),
      curso_ultima_vez: new FormControl('', Validators.required),
      curso_recibido: new FormControl('', Validators.required),
      curso:  new FormControl('', Validators.required),
      tema:  new FormControl('', Validators.required),
      curso_resultados_esperados: new FormControl('', Validators.required),
      curso_interesado_actualmente: new FormControl('', Validators.required),
      por_que: new FormControl('', Validators.required),
      horas: new FormControl('', Validators.required),
      horario: new FormControl('', Validators.required),
      dnctype: new FormControl(''),
      idAgenda: new FormControl(''),
    });
  }

  // agregamos la propiedad get para hacer más fácil el acceso a los controles del form en el HTML
  get formControls() { return this.dncForm.controls; }

  // funcion encuesta sólo permite números
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  /**
   * validación y funcion que carga los datos vía post
   */
  onSubmit() {
    this.submitted = true;
    this.loading = true;
    // nos detenemos aquí si es invalido
    if (!this.dncForm.valid) {
      return false;
    }
    // tslint:disable-next-line:no-string-literal
    this.dncForm.controls['dnctype'].setValue(this.sector);
    // tslint:disable-next-line:no-string-literal
    this.dncForm.controls['idAgenda'].setValue(this.idAgendas);
    this.dncCuestionario.addDnc(this.dncForm.value).subscribe((result) => {
      this.snack.showSnackBar(JSON.stringify(result.success), 'Listo');
      this.submitted = false;
      // enviar al formulario
      // this.dncActive.emit(this.dncactivity);
      // limpiar formulario
      this.resetForm(this.dncForm);
      this.isdnc = 1;
      this.loading = false;
      // this.addvalues(this.dncForm);
      /**
       * método de cargar los datos con una api
       */
      this.getFromApi(this.idAgendas);
    }, (error) => {
      this.snack.showSnackBar(JSON.stringify(error.error), 'Error');
      console.error(error.error);
    });
  }

  // función para resetear el formulario
  resetForm(fmg: FormGroup) {
    let control: AbstractControl = null;
    fmg.reset();
    fmg.markAsUntouched();
    Object.keys(fmg.controls).forEach((name) => {
      control = fmg.controls[name];
      control.setErrors(null);
    });
    // tslint:disable-next-line:object-literal-key-quotes
    fmg.setErrors({'invalid': true});
  }

  ngAfterContentChecked(): void {
    this.cursoTrabajo = this.sharedService.curso_capacitacion_desmpenio_trabajo;
  }

  addvalues(form: FormGroup) {
    // tslint:disable-next-line:no-string-literal
    const value = form.controls['curso_capacitacion_desmpenio_trabajo'].value;
    this.sharedService.updateComp(value);
  }
  /**
   * get value from api rest
   */
  getFromApi(id: number) {
    this.dncCuestionario.getDncFromIdAgenda(id).subscribe(
      (response) => {
        this.DNCmodelo = response;
      },
      (error ) => {
        this.snack.showSnackBar(JSON.stringify(error), 'Error');
      }
    );
  }

  /**
   * funciones de impresion gubernamental con datos
   */
  cargadncgubernamentalWithoutData(event) {
    //
    const dncGubernamentalWOData = {
      datosWOD: '',
      detalle: this.detallesEncuesta
    };
    this.dncGubernamentalEmpty.emit(dncGubernamentalWOData);
  }

  /**
   * cuando se lance el evento click en la plantilla llamaremos a este método
   */
  cargadncSocialNoData( event ) {
    const dncGubernamentalNoData = {
      datosNoDnc: '',
      detalle: this.detallesEncuesta
    };
    this.dncActiveEmpty.emit(dncGubernamentalNoData);
  }


  /**
   *
   * cuando se lance el evento click en la plantilla llamaremos a este método
   */
  cargardncsocialData( event ) {
    // usamos el método emit
    const dncSocial = {
      datosDnc: this.DNCmodelo,
      detalle: this.detallesEncuesta
     };
    this.dncActive.emit(dncSocial);
  }
  /**
   * cuando se lance el evento click en la pantalla cargamos datos en dnc gubernamental
   */
  cargardncgubernamentalData( evt ) {
    // usar método emit
    const dncGubernamentalDatos = {
      datosDnc: this.DNCmodelo,
      detalles: this.detallesEncuesta
     };
    this.dncGubernamental.emit(dncGubernamentalDatos);
  }
  /**
   * base 64 to blob
   */
  base64ToBlob(base64, type) {
    // tslint:disable-next-line:one-variable-per-declaration
    const bytes = atob(base64), len = bytes.length;
    // tslint:disable-next-line:one-variable-per-declaration
    const buffer = new ArrayBuffer(len), view = new Uint8Array(buffer);
    for (let i = 0; i < len; i++) {
      // tslint:disable-next-line:no-bitwise
      view[i] = bytes.charCodeAt(i) & 0xff;
      return new Blob( [ buffer ], { type } );
    }
  }

}
