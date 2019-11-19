import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// material module
import { MaterialModule } from '../../material/material.module';
// flexlayout
import { FlexLayoutModule } from '@angular/flex-layout';
// forms modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import http
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// router
import { RouterModule, Routes } from '@angular/router';
// importamos el login component
import { LoginComponent } from '../../pages/login/login.component';
// importamos el servicio login
import { LoginService } from '../../services/login.service';
// form
import {MatInputModule} from '@angular/material';
// interceptor
import { ErrorInterceptor } from '../../helpers/error-interceptor';
// jwtinterceptor
import { JwtInterceptor } from '../../helpers/jwt-interceptor';
// importar directiva only number
import { NumbersOnlyDirective } from '../../directives/numbers-only.directive';

// rutas
const LoginLayoutRoutes: Routes = [
  { path: 'login', component: LoginComponent }
];

@NgModule({
  declarations: [
    LoginComponent,
    NumbersOnlyDirective
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild(LoginLayoutRoutes),
    MatInputModule,
    ReactiveFormsModule
  ],
  // agregar a providers
  providers: [
    LoginService,
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ]
})
export class AuthLayoutModule { }
