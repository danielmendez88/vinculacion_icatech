import { Component, OnInit, Input } from '@angular/core';
// importar los grupos la creacion de formularios
import { FormBuilder, FormGroup, Validators, AbstractControl, NgForm, FormControl } from '@angular/forms';
// importar el componente de municipios servicios
import { MunicipiosService } from '../../services/municipios.service';
// modelo
import { Municipios } from '../../models/municipios';
// estados
import { Estados } from '../../models/estado';
// servicio estado
import { EstadoService } from '../../services/estado.service';
// servicio de la agenda
import { AgendaService } from '../../services/agenda.service';
// rutas
import { ActivatedRoute, Router } from '@angular/router';
// snackbar
import {MatSnackBar} from '@angular/material/snack-bar';
// tipo visita
import { TipovisitaService } from '../../services/tipovisita.service';
// modelos tipo visita
import { TipoVisita } from '../../models/tipoVisita';
// servicio clientes
import { ClientesService } from '../../services/clientes.service';
// modelos clientes
import { Cliente, Vinculador } from '../../models/clientes';
// vinculador servicio
import { VinculadorService } from '../../services/vinculador.service';
// importar servicio de auth
import { AuthService } from '../../services/auth.service';
// importar titulo
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {
  isOnload = false;
  agendaFormGroup: FormGroup;
  formGroup: FormGroup;
  // modelo municipio
  MunicipioModel: Municipios[];
  // modelo estado
  EstadoModel: Estados[];
  // visita
  visitaModel: TipoVisita[];
  // clientes model
  clientesModel: Cliente[];
  // vinculador modelo
  vinculadorModel: Vinculador[];
  // variable de submiteo
  isSubmitted  =  false;
  // duración del snackbar
  snackbarduration = 4;
  isLoad = false;
  // variable de cuerpoAdministrativo
  cuerpoAdmin = localStorage.getItem('currentcuerpoAdministrativo');
  // convertir
  cuerpoAdminInt = +this.cuerpoAdmin;
  // variable de adscripcion
  adscription = localStorage.getItem('currentAdscripcion');
  // convertir
  adscriptionInt = +this.adscription;
  // iduser
  iduser = localStorage.getItem('currentUserId');
  // convertir
  iduserInt = +this.iduser;
  /**
   * retorna un array con el nombre array
   */
  get formArray(): AbstractControl | null { return this.formGroup.get('formArray'); }

  // tslint:disable-next-line:max-line-length
  constructor(
    private estadoservice: EstadoService,
    private apiservice: MunicipiosService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public apiAgenda: AgendaService,
    private router: Router,
    private snackBar: MatSnackBar,
    private tipoVisita: TipovisitaService,
    private cliente: ClientesService,
    private vinservice: VinculadorService,
    private auth: AuthService,
    private titulo: Title
  ) {
    // optener los datos desde el inicio
    this.getEstados();
    this.getMuni();
    this.getTipoVisitas();
    this.getClientes();
    this.getVinculadores();
    this.agendaFormGroup = this.createFormGroup(this.formBuilder);
  }

  ngOnInit() {
    // creamos el grupo
    this.titulo.setTitle('Sivic / Generar Nueva Agenda');
    // generar el formulario del grupo con el frombuilder
  }

  // creamos un grupo
  createFormGroup(formBuilder: FormBuilder) {
    return formBuilder.group({
        id: new FormControl(null),
        seleccionarSector: new FormControl(null, Validators.required),
        clienteSelector: new FormControl(null, Validators.required),
        vinculadorSelector: new FormControl(null, Validators.required),
        tipoVisitaSelector: new FormControl(null, Validators.required),
        Fecha: new FormControl(null, Validators.required),
        hora: new FormControl(null, Validators.required),
        observaciones: new FormControl(null),
    });
  }

  // metodo para obtener los municipio
  getMuni(): void {
    this.apiservice.getAllMunicipios().subscribe((MunicipioModel: Municipios[]) => {
      this.MunicipioModel = MunicipioModel;
    });
  }

  // abrir snackbar error
  openErrorSnackBar() {
    this.snackBar.openFromComponent(ErrorSnackComponent, {
      duration: this.snackbarduration * 1000,
    });
  }

  // tslint:disable-next-line:no-unused-expression
  getVinculadores(): void {
    this.vinservice.getVinculador(this.cuerpoAdminInt, this.adscriptionInt, this.iduserInt)
    .subscribe((VinculadorModel: Vinculador[]) => {
      this.vinculadorModel = VinculadorModel;
    });
  }

  // metodo para obtener los estados
  getEstados(): void {
    this.estadoservice.getEstados().subscribe((state: Estados[]) => {
      this.EstadoModel = state;
    });
  }
  // metodo get tipo visita
  getTipoVisitas(): void {
    this.tipoVisita.getTipoVisita().subscribe((visita: TipoVisita[]) => {
      this.visitaModel = visita;
    });
  }
  // metodo para obtener todas las visitas
  getClientes(): void {
    this.cliente.getClientes(this.cuerpoAdminInt).subscribe((cliente: Cliente[]) => {
      this.clientesModel = cliente;
    });
  }
  // guardar registros
  onSaveAgenda(form: NgForm): void {
    this.isSubmitted = true;
    this.isOnload = true;
    const ObjetoAgenda = {
      id: null,
      tipo: this.agendaFormGroup.get('seleccionarSector').value,
      cliente: this.agendaFormGroup.get('clienteSelector').value,
      vinculador: this.agendaFormGroup.get('vinculadorSelector').value,
      tipovisita: this.agendaFormGroup.get('tipoVisitaSelector').value,
      fecha: this.agendaFormGroup.get('Fecha').value,
      hora: this.agendaFormGroup.get('hora').value,
      observaciones: this.agendaFormGroup.get('observaciones').value,
      asignado: this.auth.getCurrentUser()
    };
    // nuevo elemento que se agrega a la base de datos
    this.apiAgenda.addNewAgenda(ObjetoAgenda).subscribe((result) => {
      this.isSubmitted = false;
      this.isLoad = true;
      this.resetForm(this.agendaFormGroup); // reseteamos el formulario
      // navegando + result.data.id
      this.router.navigate(['seguimiento/' + result.id, {loader: this.isLoad}]);
    }, (err) => {
      this.openErrorSnackBar();
      console.error(err);
    });
  }

  // función de resetear formulario
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

}

// nuevo componente
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'snackbar-component-error',
  templateUrl: 'snackbar-component-error.html',
  styles: [`
    .error-snack {
      color: red;
    }
  `]
})
export class ErrorSnackComponent {}
