// importar authservice
import { AuthService } from './../../services/auth.service';
import { ClientesService } from './../../services/clientes.service';
import {
  FormBuilder,
  FormControl,
  Validators,
  FormGroup
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CommonValidators } from 'ng-validator/src/validators/CommonValidators';
import { SnackserviceService } from 'src/app/services/snackservice.service';
// importar reset Form Service
import { ResetformService } from 'src/app/services/resetform.service';
// importar servicios de ClientesService
@Component({
  selector: 'app-frmclientes',
  templateUrl: './frmclientes.component.html',
  styleUrls: ['./frmclientes.component.scss']
})
export class FrmclientesComponent implements OnInit {
  // formgroup
  clienteForm: FormGroup;
  // submiteo
  submmited = false;
  /**
   * TODO: variables del spinner
   */
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  displayProgressSpinner = false;
  spinnerWithoutBackdrop = false;

  constructor(
    private fb: FormBuilder, // en el constructor inicializamos la variable del formBuilder
    private cls: ClientesService,
    private snack: SnackserviceService,
    private auth: AuthService,
    private rsFrm: ResetformService
  ) {}

  ngOnInit() {
    this.clienteForm = this.formClient(this.fb);
  }

  formClient(formBuilder: FormBuilder) {
    return formBuilder.group({
      institucion: new FormControl(null, [
        Validators.required,
        CommonValidators.requiredTrim
      ]),
      direccion: new FormControl(null, [
        Validators.required,
        CommonValidators.requiredTrim
      ]),
      nombreTitutlar: new FormControl(null, [
        Validators.required,
        CommonValidators.requiredTrim
      ]),
      cargo: new FormControl(null, [
        Validators.required,
        CommonValidators.requiredTrim
      ]),
      telefonoInstitucional: new FormControl(null, [
        Validators.required,
        CommonValidators.isPhone
      ]),
      nombreEnlace: new FormControl(null, [
        Validators.required,
        CommonValidators.requiredTrim
      ]),
      cargoEnlace: new FormControl(null, [
        Validators.required,
        CommonValidators.requiredTrim
      ]),
      telefonoEnlace: new FormControl(null, [
        Validators.required,
        CommonValidators.isPhone
      ]),
      correoEnlace: new FormControl(null, [
        Validators.required,
        CommonValidators.isEmail
      ]),
      observaciones: new FormControl(null)
    });
  }
  /**
   * TODO: convenencia para el acceso fácil a campos en el formulario
   */
  get clientForm() {
    return this.clienteForm.controls;
  }

  /**
   * TODO: formulario
   */
  onSubmitFormClient(value) {
    if (this.clienteForm.invalid) {
      return;
    }
    /**
     * TODO: modificar el formulario
     */
    this.spinnerWithoutBackdrop = true;
    this.submmited = true;
    const clientForm = new FormData();
    const getAdministrative = this.auth.getCurrentAdministrative();
    clientForm.append('institucion', value.institucion);
    clientForm.append('direccion', value.direccion);
    clientForm.append('nombreTitular', value.nombreTitutlar);
    clientForm.append('cargo', value.cargo);
    clientForm.append('telfonoInstitucional', value.telefonoInstitucional);
    clientForm.append('nombreEnlace', value.nombreEnlace);
    clientForm.append('cargoEnlace', value.cargoEnlace);
    clientForm.append('telefonoEnlace', value.telefonoEnlace);
    clientForm.append('correoEnlace', value.correoEnlace);
    clientForm.append('observaciones', value.observaciones);
    clientForm.append('cliente_id', getAdministrative);
    this.cls.saveClientes(clientForm).subscribe(
      response => {
        /**
         * TODO: respuesta de la petición generada a través del apirest
         */
        this.snack.showSnackBar(JSON.stringify(response.success), 'Listo');
        this.rsFrm.resetForms(this.clienteForm); // resetear formularios
        // console.log(response.success);
        this.spinnerWithoutBackdrop = false;
      },
      error => {
        this.snack.showSnackBar(JSON.stringify(error.error), 'Error!');
        console.error(error);
        this.spinnerWithoutBackdrop = false;
      }
    );
  }
  /**
   * TODO: funcion para obtener el spinnerfunction
   */
  // showSpinnerWithOutBackrop = () => {
  //   this.spinnerWithoutBackdrop = true;
  //   setTimeout(() => {
  //     this.spinnerWithoutBackdrop = false;
  //   }, 3000);
  // }
}
