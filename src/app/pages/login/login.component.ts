import { Component, OnInit, NgZone } from '@angular/core';
// forms
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// auth service
import { AuthService } from '../../services/auth.service';
// importamos el router
import { Router, ActivatedRoute } from '@angular/router';
// first
import { first } from 'rxjs/operators';
// matsnackbar
import {MatSnackBar, MatSnackBarVerticalPosition} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // login form
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  authToken: any;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private authtenticationService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private snack: MatSnackBar,
    private ngz: NgZone
  ) {
    // redireccionar a home si ya estamos logueados
    if (this.authtenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
   }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      numeroEnlace: ['', Validators.required],
      passcode: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    // tslint:disable-next-line:no-string-literal
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // fácil acceso a los campos del formulario
  get f() {return this.loginForm.controls; }

  // metodo submit
  InEnvio() {
    this.submitted = true;
    this.loading = true;
    // nos detenemos aquí si el login es invalido
    if (this.loginForm.invalid) {
      this.loading = false;
      return;
    }

    // llamamos el servicio
    this.authtenticationService.login(this.f.numeroEnlace.value, this.f.passcode.value)
      .subscribe(
        data => {
          this.ngz.run(() => {
            this.router.navigate([this.returnUrl]);
          });
          // this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
          this.loading = false;
          let errorMessage = 'Error: Credenciales inválidas.';
          if (error.status === 401) {
            errorMessage = 'Error: La contraseña no coincide';
          } else if (error.status === 402) {
            errorMessage = 'Error: Número de Enlace no Existe';
          }
          this.snack.open(errorMessage, 'Error', {
            duration: 2000,
            verticalPosition: 'bottom',
            horizontalPosition: 'right'
          });
        }
      );
  }

}
