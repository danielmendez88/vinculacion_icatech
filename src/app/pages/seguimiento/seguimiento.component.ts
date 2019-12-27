import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
// modelo e interface agendas detalles
import { AgendaDetails } from '../../models/agendaDetails';
// import servicio agenda
import { AgendaService } from '../../services/agenda.service';
// rutas
import { ActivatedRoute, Router } from '@angular/router';
// importar servicio
import { SnackserviceService } from '../../services/snackservice.service';
// importamos angular forms
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.scss']
})
export class SeguimientoComponent implements OnInit {
  isLoadingResults = false;
  contador: number;
  Detalles = [];
  propuesta = '';
  formatoHora: string;
  statusSeguimiento: number | null;
  seguimientoForm: FormGroup;
  isOnload = false;

  // tiempo de duración
  durationInSeconds = 5000;
  Message = '¡Exito! Comision Registrada';
  isLoad = true;
  constructor(
    private route: ActivatedRoute,
    private snackservice: SnackserviceService,
    private fb: FormBuilder, // en el constructor inicializamos la variable del formBuilder
    private aservice: AgendaService, // inicializamos el servicio
    private routes: Router,
  ) { }

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
    hora: null,
    iscursoincorporated: false
  };

  ngOnInit() {
    const isLoad = this.route.snapshot.queryParamMap.get('loader');
    const AgendaId = this.route.snapshot.params.id;
    // this.route.data.subscribe(data => console.log('Data :', data));
    this.contador = this.route.snapshot.data.archivosResolver.length;
    this.propuesta = this.route.snapshot.data.detalleSegimiento[0].propuesta;
    this.statusSeguimiento = this.route.snapshot.data.detalleSegimiento[0].statusAgenda;
    if (this.contador > 0) {
      this.Detalles = this.route.snapshot.data.archivosResolver;
    }
    // agenda
    this.Agend = this.route.snapshot.data.seguimientos;
    // validar la hora
    if (this.Agend.hora !== null) {
      this.formatoHora = this.timeConvert(this.Agend.hora);
    } else {
      this.formatoHora = null;
    }
    /**
     * validamos el estatus del seguimiento
     */
    if (this.statusSeguimiento === 2) {
      this.seguimientoForm = this.createFormBuilder(this.fb);
      this.seguimientoForm.get('id').setValue(this.Agend.id);

    }
    // loader
    if (isLoad) {
      setTimeout(() => {
        this.snackservice.showSnackBar(this.Message, null);
      });
    }
  }

  // descargar archivo pdf
  downloadFilePdf(archivo: string, id: number): any {
    return `http://localhost:8000/archivos/${id}/${archivo}`;
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
  // create form con el formgroup
  createFormBuilder(formBulder: FormBuilder) {
    return formBulder.group({
      id: new FormControl(null),
      seguimientoOption: new FormControl('', [Validators.required])
    });
  }

  get seguimientoOption() { return this.seguimientoForm.get('seguimientoOption'); }

  updateVinculacion(): void {
    if (this.seguimientoForm.valid) {
      // cargar
      this.isOnload = true;
      // es valido
      this.aservice.updateVinculacion(this.seguimientoForm.value).subscribe(
        response => {
          // limpamos el formulario
          this.isOnload = false;
          this.seguimientoForm.reset(); // reseteamos el formulario
          // redireccionar
          this.routes.navigate(['listaagenda/']);
        },
        error => {
          console.error(error);
        }
      );
    }
  }

}
