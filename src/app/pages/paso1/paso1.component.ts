import { Component, OnInit, ViewChild, ElementRef, NgZone, Inject, Input } from '@angular/core';
// importar servicio
import { SnackserviceService } from '../../services/snackservice.service';
// formulario
import {FormControl, Validators, FormBuilder, FormGroup, NgForm, AbstractControl} from '@angular/forms';
// servicio agenda
import { AgendaService } from '../../services/agenda.service';
// rutas
import { ActivatedRoute, Router } from '@angular/router';
// modelo e interface agendas detalles
import { AgendaDetails } from '../../models/agendaDetails';
// cargando servicio
import { SeguimientosService } from '../../services/seguimientos.service';
// importar modelo DetalleSeguimiento
import { DetalleSeguimiento } from '../../models/seguimiento';
import { DomSanitizer } from '@angular/platform-browser';
// file saver
import * as FileSaver from 'file-saver';
// dialogo
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
// location
import { Location } from '@angular/common';
// importar titulo
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-paso1',
  templateUrl: './paso1.component.html',
  styleUrls: ['./paso1.component.scss'],
  preserveWhitespaces: false,
})
export class Paso1Component implements OnInit {
  // variable de la imagen
  fileToUpload: File = null;
  fileUpload: File = null;
  imageUrl: string;
  imagenAgend: any;
  imageDetalleUrl: string; // variable de la imagen
  imagenDetalle: any; // variable del detalle
  contadorPaso1: number;
  // validador de stepper
  editable: boolean;
  // detalles de la agenda
  detallesAgenda = [];
  // habilitado - declaracion de variable
  habilitado: boolean;
  // inicializamos el formGroup
  form: FormGroup;
  isLoadingResults = false;
  // inializar un worker
  private pdfWorker: Worker;
   // error en el pdf y cargador pdf
  cargandoPdf = false;
  errorPDF = false;
  // formato hora
  formatoHora: string;
  contadorArchivos: number;
  archivosArray: any = [];
  // incidencia
  incidencias = [];
  // hacemos uso de viewchild para accesar al input de la plantilla
  @ViewChild('Document') myDocumento: ElementRef;
  @ViewChild('tipoincidencia') incidenciaType: ElementRef;
  // evento dncActivo
  ActivoDNC: number;
  // declaramos la entrada del componente hijo dialog
  @Input() data;
  // declarar worker cuestionario dnc social
  private pdfWorkerSocial: Worker;
  // error y carga de pdf social
  cargandoPdfSocial = false;
  errorPdfSocial = false;
  // worker gubernamental con datos
  private pdfWorkerGobData: Worker;
  cargandoPdfGobData = false;
  errorPdfGobData = false;
  // idAgenda
  public idAgend: number;
  // boolean type value
  public iscurso: boolean;
  // string titular value
  public titular: string;
  // formgroup de arhcivo
  formArchivo: FormGroup;
  // variable booleana para submiteo
  submitted = false;
  archivospropuestaArray: any = [];
  contadorpropuestaArchivo: number;
  // cargar incidencia
  loadIncidencia: number;
  // incidencia
  tiposincidencias: string | null;
  // tipo incidencia deshabilitado
  tipoincidenciaDisabled = true;
  // worker social Not Data
  private workerSocialNoData: Worker;
  cargandopdfsocialNoData = false;
  errorpdfSocialNoData = false;
  // worker cursos propuesta
  private cursoPropuestaWorker: Worker;
  cargandoCursoPdf = false;
  errorCursoPdf = false;
  // agregar seguimientos para cargar el resultado del resolver
  seguimientos: any;
  constructor(
    private snackservice: SnackserviceService,
    private As: AgendaService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private sg: SeguimientosService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private ngz: NgZone,
    private dialog: MatDialog,
    private $location: Location, // agregado recientemente
    private Titulo: Title,
  ) { }
  // tiempo de duración
  durationInSeconds = 5000;
  Message = '¡Exito! Comision Registrada';
  isLoad = true;

  email = new FormControl('', [Validators.required, Validators.email]);

  // obtener una interface
  public Agend: AgendaDetails = {
    id: 0,
    nombreEstudio: '',
    fecha: null,
    colonia: '',
    direccion: '',
    numExterior: '',
    numInterior: '',
    observaciones: '',
    ageb: '',
    seccion: '',
    tipo: 0,
    folio: '',
    nombre: '',
    nombreEntidad: '',
    seguimento: false,
    tipoVista: '',
    institucion: '',
    nombreTitular: '',
    cargo: '',
    telfonoInstitucional: '',
    nombreEnlace: '',
    cargoEnlace: '',
    telefonoEnlace: ''
  };

  // obtener interface del detalle
  public DetailAgend: DetalleSeguimiento = {
    id: 0,
    propuesta: '',
    seguimiento: false,
    archivo: '',
    extension: '',
    ruta: '',
    seg_id: 0,
    file_id: 0
  };
  // detalle interface
  public Detalles: DetalleSeguimiento = {
    id: 0,
    propuesta: '',
    seguimiento: false,
    archivo: '',
    extension: '',
    ruta: '',
    seg_id: 0,
    file_id: 0
  };
  getErrorMessage() {
    return this.email.hasError('required') ? 'debes ingresar un valor' :
      this.email.hasError('email') ? 'no es un correo Válido' : '';
  }


  ngOnInit() {
    // poner el titulo
    // set titulos
    this.Titulo.setTitle('Sivic / Agenda de seguimiento');
    // función del worker inicializamos el objeto para generar los reportes con webworkers
    this.pdfWorker = new Worker('/assets/workers/dnc/workerdnc.js'); // !importante
    this.pdfWorkerSocial = new Worker('/assets/workers/dnc/workerdncSocial.js'); // !importante
    this.pdfWorkerGobData = new Worker('/assets/workers/dnc/workerdncgubernamentaldata.js'); // !importante
    this.workerSocialNoData = new Worker('/assets/workers/dnc/workerdncSocialNotData.js'); // !importante
    this.cursoPropuestaWorker = new Worker('/assets/workers/cursos/workers.js'); // !importante
    const isLoad = this.route.snapshot.paramMap.get('loader');
    const AgendaId = this.route.snapshot.data.getAgenda.id;
    this.idAgend = this.route.snapshot.data.getAgenda.id;
    this.editable = this.route.snapshot.data.getAgenda.seguimiento;
    /**
     * iscursoincorporated en false por defecto
     */
    this.iscurso = this.route.snapshot.data.getAgenda.iscursoincorporated;
    /**
     * cargamos el valor de los archivos desde el resolver - separamos esta funcionalidad
     * con el fin de tener un mejor control en el proceso del sistema
     * ya que puede haber cierta incongruencia al momento de iterar con las consultas a la base de datos
     */
    this.contadorArchivos = this.route.snapshot.data.archivos.length;
    /**
     * verificamos que el contador sea mayor a cero
     */
    if (this.contadorArchivos > 0) {
      this.archivosArray = this.route.snapshot.data.archivos; // enviar vía input
    }
    /**
     * se carga y muestra sus propiedades en la variable asignada
     */
    this.archivospropuestaArray = this.route.snapshot.data.archivosPdf; // va como input
    // cargamos la incidencia
    this.incidencias = this.route.snapshot.data.incidenciaResolve; // va como input
    // agenda
    this.Agend = this.route.snapshot.data.getAgenda;
    // titular de la agenda
    this.titular = this.Agend.nombreTitular;
    if (this.Agend.hora !== null) {
      this.formatoHora = this.timeConvert(this.Agend.hora);
    } else {
      this.formatoHora = null;
    }
    // cargar la variable de seguimientos
    this.seguimientos = this.route.snapshot.data.detalles;
    // le pasamos el valor del id
    // this.form.controls.agenda_id.setValue(AgendaId);
    // le pasamos el valor del id al control
    // this.formArchivo.controls.agendas_id.setValue(AgendaId);
    // es dnc
    this.ActivoDNC = 0;
    const $ngzone = this.ngz;
    const self = this;
    // tslint:disable-next-line:only-arrow-functions
    this.pdfWorker.onmessage = function( evt ) {
      $ngzone.run(() => {
        self.cargandoPdf = false;
      });

      FileSaver.saveAs( self.base64ToBlob( evt.data.base64, 'application/pdf' ), evt.data.fileName );
    };
    // pdf error
    // tslint:disable-next-line:only-arrow-functions
    this.pdfWorker.onerror = function(e) {
      $ngzone .run(() => {
        console.log(e);
        self.errorPDF = false;
      });
    };

    // tslint:disable-next-line:only-arrow-functions
    this.pdfWorkerSocial.onmessage = function( event ) {
      // esto es un hack porque estamos fuera del contexto del worker
      $ngzone.run(() => {
        self.cargandoPdfSocial = false;
      });
      // file saver
      FileSaver.saveAs(self.base64ToBlob( event.data.base64, 'application/pdf'), event.data.fileName);
    };
    // pdf social
    // tslint:disable-next-line:only-arrow-functions
    this.pdfWorkerSocial.onerror = function(e) {
      $ngzone.run(() => {
        self.snackservice.showSnackBar(JSON.stringify(e), 'Error');
        self.errorPdfSocial = false;
      });
    };

    // tslint:disable-next-line:only-arrow-functions
    this.pdfWorkerGobData.onmessage = function( evt ) {
      // esto es un hack porque estamos fuera del contexto del worker
      $ngzone.run(() => {
        self.cargandoPdfGobData = false;
      });
      // file saver
      FileSaver.saveAs(self.base64ToBlob( evt.data.base64, 'application/pdf'), evt.data.fileName);
    };
    // pdf gubernamental
    // tslint:disable-next-line:only-arrow-functions
    this.pdfWorkerGobData.onerror = function(e) {
      $ngzone.run(() => {
        self.snackservice.showSnackBar(JSON.stringify(e), 'Error');
        self.errorPdfGobData = false;
      });
    };
    // tslint:disable-next-line:only-arrow-functions
    this.workerSocialNoData.onmessage = function( evt ) {
      $ngzone.run(() => {
        self.cargandopdfsocialNoData = false;
      });
      // file saver
      FileSaver.saveAs(self.base64ToBlob( evt.data.base64, 'application/pdf'), evt.data.fileName);
    };
    // tslint:disable-next-line:only-arrow-functions
    this.workerSocialNoData.onerror = function(e) {
      $ngzone.run(() => {
        self.snackservice.showSnackBar(JSON.stringify(e), 'Error');
        self.errorpdfSocialNoData = false;
      });
    };

    // tslint:disable-next-line:only-arrow-functions
    this.cursoPropuestaWorker.onmessage = function(ex) {
      $ngzone.run(() => {
        self.cargandoCursoPdf = false;
      });
      FileSaver.saveAs(self.base64ToBlob( ex.data.base64, 'application/pdf'), ex.data.fileName);
    };
    /**
     * pdf curso propuesta error
     */
    // tslint:disable-next-line:only-arrow-functions
    this.cursoPropuestaWorker.onerror = function(e) {
      $ngzone.run(() => {
        self.errorCursoPdf = false;
      });
    };
    // enviar el detalle
    // this.getDetail(AgendaId);
    // mostrar nuevo detalle
    // this.getSeguimiento(AgendaId);
    if (isLoad) {
      setTimeout(() => {
        this.snackservice.showSnackBar(this.Message, 'Agregado!');
      });
    }
    /**
     * trabajamos con la suscripción
     * para actualizar los datos del componente
     */

  }

  // metodo log
  log(msg: string, seconds: number) {
    this.snackservice.showSnackBar(msg, null);
  }

  // mostrar imagen a subir en formulario
  handleFileInput(file) {
    if (file.target.files.length > 0) {
      this.fileToUpload = file.target.files[0];
    }
  }


  // seleccionar archivo
  onSelectedFile(event) {
    if (event.target.files.length > 0) {
      this.fileUpload = event.target.files[0];
      // this.form.controls.nombreArchivo.setValue(file);
    }
  }

  // función para resetear el formulario
  resetForm(frm: FormGroup) {
    let control: AbstractControl = null;
    frm.reset();
    frm.markAsUntouched();
    Object.keys(frm.controls).forEach((name) => {
      control = frm.controls[name];
      control.setErrors(null);
    });
    // tslint:disable-next-line:object-literal-key-quotes
    frm.setErrors({'invalid': true});
  }

  // base 64 to blob
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

  // abrir dialogo
  openDialog(agenda): void {
    const diglogRef = this.dialog.open(DialogSeguimiento, {
      width: '250px',
      data: {id: agenda, service: this.As}
    });
    diglogRef.afterClosed().subscribe(result => {
      // si abirmos el dialogo obtenemos un valor del child view que se acaba de cerrar
      if (result && result.data === true) {
        this.editable = true;
      }
    });
  }

  // funcion para convertir un formato de 24 horas a 12 horas
  timeConvert(time) {
    // checar el tiempo correcto
    const tiempo = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
    if (tiempo.length > 1) { // si el formato de hora es correcto
       time = tiempo.slice(1);
       time[5] = + time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
       time[0] = + time[0] % 12 || 12; // Adjust hours
    }
    return time.join (''); // return adjusted time or original string
  }

  // get method seguimiento
  // getSeguimiento(id: number) {
  //   this.sg.getSeguimientobyId(id)
  //       .subscribe(items => {
  //         this.DetailAgend = items[0],
  //         this.Detalles = items[1];
  //         this.imageUrl = 'http://localhost:8000/archivos/' + this.DetailAgend.id + '/' + this.DetailAgend.archivo;
  //         this.imageDetalleUrl = 'http://localhost:8000/archivos/' + this.Detalles.id + '/' + this.Detalles.archivo;
  //         this.imagenAgend = this.sanitizer.bypassSecurityTrustResourceUrl(this.imageUrl);
  //         this.imagenDetalle = this.sanitizer.bypassSecurityTrustResourceUrl(this.imageDetalleUrl);
  //       },
  //       err => {
  //         console.log(err);
  //       });
  // }

  receiveMessage($event): void {
    try {
      this.cargandoPdfSocial = true;
      // imprimir
      this.pdfWorkerSocial.postMessage(JSON.stringify($event));
    } catch (error) {
      this.errorPdfSocial = false;
      this.snackservice.showSnackBar(JSON.stringify(error), 'Error');
    }
    // this.ActivoDNC = $event;
  }

  printDncGob($evt): void {
    try {
      this.cargandoPdfGobData = true;
      console.log($evt);
      // imprimir
      this.pdfWorkerGobData.postMessage(JSON.stringify($evt));
      console.log($evt);
    } catch (error) {
      this.errorPdfSocial = false;
      this.snackservice.showSnackBar(JSON.stringify(error), 'Error');
    }
  }

  // imprimir documento dnc Gubernamental sin datos
  printDncGobEmpty(): void {
    try {
      this.cargandoPdf = true;
      this.pdfWorker.postMessage(JSON.stringify(''));
    } catch (error) {
      this.cargandoPdf = false;
      console.log(error);
    }
  }

  // imprimir documento dnc social sin datos
  printDncSocialEmpty(): void {
    try {
      this.cargandopdfsocialNoData = true;
      this.workerSocialNoData.postMessage(JSON.stringify(''));
    } catch (error) {
      this.cargandopdfsocialNoData = false;
      console.log(error);
    }
  }

  // imprimir el documento de la propuesta de curso
  printPropuesta($evt): void {
    try {
      this.cargandoCursoPdf = true;
      this.cursoPropuestaWorker.postMessage(JSON.stringify($evt));
      console.log($evt);
    } catch (error) {
      this.cargandoCursoPdf = false;
      console.log(error);
    }
  }

}

@Component({
  selector: 'app-paso1',
  templateUrl: 'seguimiento_dialog.html'
})
// tslint:disable-next-line:component-class-suffix
export class DialogSeguimiento {
  // decclaramos una variable booleana
  senddata = true;
  constructor(
    public dialogRef: MatDialogRef<DialogSeguimiento>,
    @Inject(MAT_DIALOG_DATA) public data: AgendaDetails,
    private service: AgendaService,
    private router: Router
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }

  onAcceptClick(id): void {
    // redireccionar la url y pasar el componente al endpoint
    this.service.updateSeguimiento(id).subscribe(
      next => {
        console.log(next);
        this.dialogRef.close({data: this.senddata});
      }
    );
  }
}
