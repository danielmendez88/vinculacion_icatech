import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
// importar bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsModule } from './components/components.module';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClientLayoutComponent } from './layouts/client-layout/client-layout.component';
// importar flexbox
import { FlexLayoutModule } from '@angular/flex-layout';
// router module
import { RouterModule } from '@angular/router';
// importamos servicios
import { NavserviceService } from './services/navservice.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
// importar http
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// agregando reactive forms
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// importar servicio
import { AgendaService } from './services/agenda.service';
// un servicio
import { SnackserviceService } from './services/snackservice.service';
// importamos el componente fullcalendar
import { FullCalendarModule } from '@fullcalendar/angular';
// interceptor
import { ErrorInterceptor } from './helpers/error-interceptor';
// jwtinterceptor
import { JwtInterceptor } from './helpers/jwt-interceptor';
// resolver
import { Resolver } from './resolver/resolver';
// resolver
import { RecordCompService } from './resolver/record-comp.service';
// slimloadingbar
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
// custom interceptor
import { CustomHttpInterceptor } from './helpers/custom-http-interceptor';
// resolver calendario
import { CalendarioService } from './resolver/calendario.service';
// resolver seguimiento
import { SeguimientoService } from './resolver/seguimiento.service';
// agregar time picke
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
// importar el servicio detalle
import { DetallesServiceService } from './resolver/detalles-service.service';
// importar resolver detalle seguimiento
import { DetalleSeguimientoResolver } from './resolver/detalle-seguimiento-resolver';
// importar incidencia resolver
import { IncidenciaResolver } from './resolver/incidencia-resolver';
// http interceptor
import { HttpErrorInterceptor } from './helpers/http-error.interceptor';
// file resolver
import { Filesresolver } from './resolver/filesresolver';
// historico resolver
import { Historicodirectores } from './resolver/historicodirectores';
// importamos el servicio dnc
import { CuestionariodncService } from './services/cuestionariodnc.service';
// agregar el servicio compartido del cuestionario
import { CuestionarioSharedService } from './services/cuestionario-shared.service';
// importar el rol resolver
import { RolResolver } from './resolver/rol-resolver';
// decode and encode service
import { DecodeencodeserviceService } from './services/decodeencodeservice.service';
// importar resolver pdf
import { Filepdfresolver } from './resolver/filepdfresolver';
// importar el resolver del id
import { CountagendaService } from './resolver/countagenda-service';
// import spinner service
import { SpinnerServiceService } from './services/spinner-service.service';
import { NotificacionesComponent } from './pages/notificaciones/notificaciones.component';
// importar agenda lista resolver
import { Listaagendaresolver } from './resolver/listaagendaresolver';
import { ProfileComponent } from './pages/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    ClientLayoutComponent,
    NotificacionesComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    MaterialModule,
    NgbModule,
    ComponentsModule,
    FlexLayoutModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FullCalendarModule,
    SlimLoadingBarModule.forRoot(),
    NgxMaterialTimepickerModule
  ],
  providers: [
    NavserviceService,
    AgendaService,
    SnackserviceService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true},
    Resolver,
    RecordCompService,
    CalendarioService,
    SeguimientoService,
    DetallesServiceService,
    DetalleSeguimientoResolver,
    IncidenciaResolver,
    Filesresolver,
    Historicodirectores,
    CuestionariodncService,
    CuestionarioSharedService,
    RolResolver,
    DecodeencodeserviceService,
    Filepdfresolver,
    CountagendaService,
    SpinnerServiceService,
    Listaagendaresolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
