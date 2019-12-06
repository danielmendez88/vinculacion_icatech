import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SeguimientosService } from '../../services/seguimientos.service';
import { SnackserviceService } from '../../services/snackservice.service';
// importar validators
import { FileValidators } from '../../../../node_modules/ng-validator';

@Component({
  selector: 'app-seguimiento-reporte',
  templateUrl: './seguimiento-reporte.component.html',
  styleUrls: ['./seguimiento-reporte.component.scss']
})
export class SeguimientoReporteComponent implements OnInit {
@Input() CountFiles: number;
@Input() archivosArray: any = [];
// inicializamos el formGroup
form: FormGroup;
@ViewChild('tipoincidencia') incidenciaType: ElementRef;
// es incidencia
esIncidencia: boolean;
// incidencias
@Input() incidencia = [];
// variable de la imagen
fileToUpload: File = null;
// variable de documento
fileUpload: File = null;
// tipoincidencia
tiposincidencias: string | null;
// nombre de la incidencia
nombreDeLaIncidencia: string | null;
// resultados
isLoadingResults = false;
// status de la agenda
status: number;
// formgroup de arhcivo
formArchivo: FormGroup;
// propuestacursoincorporated
propuestacurso: boolean;
formArchivoPdf: FormGroup;
@Input() nombreIncidencia: string | null;
@Input() agenda: number;
@Input() seguimiento: any;
// variable para asignar el seguimiento id
seguimientoId: number;
propuestas = [];
// cargar datos de los archivos
isloadPhotoEvidence: boolean;
@Input() propuestaArray: any = [];
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private sg: SeguimientosService,
    private snackservice: SnackserviceService,
  ) { }

  ngOnInit() {
    this.seguimientoId = this.seguimiento[0].seg_id;
    this.isloadPhotoEvidence = this.seguimiento[0].isloadPhotoEvidence;
    this.esIncidencia = false;
    if (this.seguimientoId === null) {
      // le pasamos el valor del id al control
      this.createForm();
      this.form.controls.agenda_id.setValue(this.agenda);
    } else {
      // ajuntar valores
      this.propuestas = this.seguimiento[0].propuesta;
      this.status = this.seguimiento[0].statusAgenda;
      this.esIncidencia = this.seguimiento[0].esincidencia;
      this.nombreDeLaIncidencia = this.seguimiento[0].nombreIncidencia;
      this.propuestacurso = this.seguimiento[0].propuestacursoincorporated;
      if (this.propuestacurso === false) {
        this.createFileFormPdf();
        this.formArchivoPdf.controls.agndaId.setValue(this.agenda);
        this.formArchivoPdf.controls.isIncidence.setValue(this.esIncidencia);
      }
    }
    if (this.isloadPhotoEvidence === false) {
      // cargamos la incidencia
      this.createFileForm();
      this.formArchivo.controls.agendas_id.setValue(this.agenda);
    }
  }

  /**
   * agregamos una función que nos construirá el formulario
   */
  createForm() {
    this.form = this.fb.group({
      isincidence: new FormControl(false),
      propuesta: new FormControl(null, Validators.required),
      agenda_id: new FormControl(null),
      incidenciaTipo: new FormControl({value: '', disabled: true})
    });
  }

  // onchange
  onChange(e) {
    const evento = e;
    // tslint:disable-next-line:triple-equals
    if (evento.checked == true) {
      // si es verdadero
      this.form.controls.incidenciaTipo.enable();
      this.form.controls.incidenciaTipo.setValidators([Validators.required]);
      this.esIncidencia = true;
      // deshabilitar archivo
      // this.formArchivoPdf.controls.nombreArchivo.disable(); // true
      // this.myDocumento.nativeElement.value = '';
      // resetear el formulario completo
      // this.resetForm(this.formArchivo);
      // this.myDocumento.nativeElement.value = ''; // vuelve el valor del documento cargado a cero
      // this.tipoincidenciaDisabled = false;
    } else {
      const reset = {};
      // tslint:disable-next-line:no-string-literal
      reset['incidenciaTipo'] = '';
      this.form.controls.incidenciaTipo.disable();
      this.form.controls.incidenciaTipo.patchValue(reset);
      this.incidenciaType.nativeElement = undefined;
      this.esIncidencia = false;
      // habilitar archivo
      // this.formArchivo.controls.nombreArchivo.enable(); // false
      // this.tipoincidenciaDisabled = true;
    }
  }

  // mostrar imagen a subir en formulario
  handleFileInput(file) {
    if (file.target.files.length > 0) {
      this.fileToUpload = file.target.files[0];
      console.log(this.fileToUpload);
    }
  }

  onSelectedFile(event) {
    if (event.target.files.length > 0) {
      this.fileUpload = event.target.files[0];
    }
  }

  // submit form
  onFormSubmit(values) {
    const formData = new FormData();
    // obtenemos el valor de la incidencia si es que está activa
    this.isLoadingResults = true;
    const esIncidencia = values.isincidence;
    const id = values.agenda_id;
    if (esIncidencia === true) {
      formData.append('propuesta', values.propuesta);
      formData.append('agenda_id', values.agenda_id);
      formData.append('isincidence', values.isincidence);
      formData.append('incidenciatipo', values.incidenciaTipo);
      this.tiposincidencias = values.incidenciaTipo;
    } else if (esIncidencia === null || esIncidencia === false) {
      formData.append('propuesta', values.propuesta);
      formData.append('agenda_id', values.agenda_id);
      formData.append('isincidence', values.isincidence);
      this.tiposincidencias = '';
    }
    // enviar datos a la api y esperar respuesta
    this.sg.createSeguimiento(id, formData)
        .subscribe(res => {
          // ocultamos el spinner
          this.isLoadingResults = false;
          // reseteamos el formulario
          this.resetForm(this.form);
          // actualizar el valor de la variable
          this.seguimientoId = 1;
          // cargar el nombre de la incidencia nombreDeLaIncidencia
          this.sg.getSeguimientobyId(id).subscribe((response) => {
            this.propuestas = response[0].propuesta;
          }, error => {
            this.snackservice.showSnackBar(JSON.stringify(error.error), 'Error!');
          });
          // incidencia
          this.esIncidencia = esIncidencia;
          // nombre de la incidencia
          this.nombreDeLaIncidencia = this.tiposincidencias;
          this.propuestacurso = false;
          if (this.propuestacurso === false) {
            this.createFileFormPdf();
            this.formArchivoPdf.controls.agndaId.setValue(this.agenda);
          }
          // mostrar resultado
          this.snackservice.showSnackBar(JSON.stringify(res.success), 'Listo');
        }, error => {
          this.snackservice.showSnackBar(JSON.stringify(error.errores), 'Error!');
        });
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
  /**
   * crear formulario para subir archivo
   */
  createFileForm() {
    this.formArchivo = this.fb.group({
      // tslint:disable-next-line:max-line-length
      imagen: new FormControl(null, [FileValidators.allowExtensions(['png', 'jpeg', 'jpg']), FileValidators.requiredFile, FileValidators.maxSize(2, 'MB')]),
      agendas_id: new FormControl(null)
    });
  }
  /**
   * conveniencia para un fácil acceso a los campos de formulario
   */
  get f() { return this.formArchivo.controls; }
  /**
   * submit form file
   */
  onFormFileSubmit(value) {
    const id = value.agendas_id;
    // nos detenemos los formularios es invalido
    if (this.formArchivo.invalid) {
      return;
    }

    /**
     * formFileData
     */
    this.isLoadingResults = true;
    const formFileData = new FormData();
    formFileData.append('imagen', this.fileToUpload, this.fileToUpload.name);
    formFileData.append('agendas_id', value.agendas_id);
    // de lo contrario enviamos la informacion al servicio de carga de archivos
    this.sg.createImagenSeguimiento(id, formFileData)
        .subscribe(response => {
          this.isLoadingResults = false;
          this.resetForm(this.formArchivo); // reseteamos el formulario
          this.snackservice.showSnackBar(JSON.stringify(response.success), 'Listo!');
          // cargamos los archivos del seguimiento sólo el archivo que contenga el pdf para que muestre en el frontend
          this.sg.getFilesSeguimientoById(id)
                 .subscribe(res => {
                   this.isloadPhotoEvidence = true;
                   if (this.isloadPhotoEvidence === true) {
                     this.archivosArray = res;
                   }
                 }, error => {
                  this.isLoadingResults = false;
                  this.snackservice.showSnackBar(JSON.stringify(error.error), 'Error!');
                 });
        }, error => {
          this.isLoadingResults = false;
          this.snackservice.showSnackBar(JSON.stringify(error.error), 'Error!'); // checarlo
        });
  }
  /**
   * crear formulario archivo pdf
   */
  createFileFormPdf() {
    this.formArchivoPdf = this.fb.group({
      // tslint:disable-next-line:max-line-length
      nombreArchivo: new FormControl(null, [FileValidators.allowExtensions(['pdf']), FileValidators.requiredFile, FileValidators.maxSize(2, 'MB')]),
      agndaId: new FormControl(null),
      isIncidence: new FormControl(null),
    });
  }
  /**
   * conveniencia para un fácil acceso a los campos de formulario
   */
  get pdf() { return this.formArchivoPdf.controls; }

  /**
   * submit from file pdf
   */
  onFormPdfSubmit(value) {
    const id = value.agndaId;
    // nos detenemos los formularios es invalido
    if (this.formArchivoPdf.invalid) {
      return;
    }
    /**
     * formFileDataPDF
     */
    this.isLoadingResults = true;
    const formFileDataPdf = new FormData();
    formFileDataPdf.append('nombreArchivo', this.fileUpload, this.fileUpload.name);
    formFileDataPdf.append('agndaId', value.agndaId);
    formFileDataPdf.append('isIncidence', value.isIncidence);
    // de lo contrario enviamos la informacion al servicio de carga de archivos
    this.sg.createfileseguimiento(id, formFileDataPdf)
          .subscribe(result => {
            this.isLoadingResults = false;
            this.resetForm(this.formArchivoPdf); // reseteamos el formulario
            // cargamos los archivos del seguimiento sólo el archivo que contenga el pdf para que muestre en el frontend
            this.sg.getfilespropuestaFromSeguimientoBy(id).subscribe( response => {
              this.propuestacurso = true;
              if (this.propuestacurso) {
                this.propuestaArray = response;
              }
            }, error => {
              this.isLoadingResults = false;
              this.snackservice.showSnackBar(JSON.stringify(error.error), 'Error!');
            });
            // mostrar el mensaje en el sistema
            this.snackservice.showSnackBar(JSON.stringify(result.success), 'Listo!');
          }, error => {
            this.isLoadingResults = false;
            this.snackservice.showSnackBar(JSON.stringify(error.error), 'Error!');
          });
  }
}
