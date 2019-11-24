import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { Profile } from '../../models/profile';
import { AuthService } from '../../services/auth.service';
// importar profile service
import { ProfileserviceService } from '../../services/profileservice.service';
import { Confirmpassword } from '../../validators/confirmpassword';
import { ErrorStateMatcher } from '@angular/material';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  formgroup: FormGroup;
  profileDetail: any;
  matcher = new MyErrorStateMatcher();
  email: any;

  constructor(
    private fromBuild: FormBuilder,
    private auth: AuthService,
    private profservice: ProfileserviceService
  ) {
    this.formgroup = this.createForm(this.fromBuild);
  }

  ngOnInit() {
    const idprofile = this.auth.useridCurrent;
    this.loadProfileDetails(idprofile);
  }

  createForm(fb: FormBuilder) {
    return fb.group({
      iduser: new FormControl(null),
      numeroenlace: new FormControl({value: '', disabled: true}),
      nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
      puesto: new FormControl('', [Validators.required]),
      categoria: new FormControl('', [Validators.required]),
      contrasena: new FormControl('', [Validators.required]),
      conrfirmarcontrasena: new FormControl('', [Validators.required]),
    }, { validator: this.checkPasswords });
  }

  loadProfileDetails(id: number) {
    this.profservice.getProfile(id).subscribe(res => {
      this.profileDetail = res;
      this.email = this.profileDetail[0].email;
      this.formgroup.controls.numeroenlace.setValue(this.profileDetail[0].numeroEnlace);
      this.formgroup.controls.nombre.setValue(this.profileDetail[0].nombre);
      this.formgroup.controls.puesto.setValue(this.profileDetail[0].puesto);
      this.formgroup.controls.categoria.setValue(this.profileDetail[0].categoria);
      this.formgroup.controls.iduser.setValue(this.profileDetail[0].id);
    });
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const pass = group.controls.contrasena.value;
    const confirmPass = group.controls.conrfirmarcontrasena.value;

    return pass === confirmPass ? null : { notSame: true };
  }

  updateProfile(values) {
    const ProfileInfo = new FormData();
    ProfileInfo.append('nombre', values.nombre);
    ProfileInfo.append('puesto', values.puesto);
    ProfileInfo.append('categoria', values.categoria);
    ProfileInfo.append('conrfirmarcontrasena', values.conrfirmarcontrasena);
    // se debe de enviar al servicio
    this.profservice.updateProfile(ProfileInfo, values.iduser).subscribe(response => {
      console.log(response);
    });
  }

}
