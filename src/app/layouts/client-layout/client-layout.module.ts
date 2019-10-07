import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// router
import { RouterModule, Routes } from '@angular/router';

import { AgendaComponent, ErrorSnackComponent } from '../../pages/agenda/agenda.component';
// material module
import { MaterialModule } from '../../material/material.module';
// flexlayout
import { FlexLayoutModule } from '@angular/flex-layout';
// form module
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// importar formulario
// tslint:disable-next-line:max-line-length
import { MatFormFieldModule, MatInputModule, MatNativeDateModule, MatRadioModule, MatSortModule, MatChipsModule, MatExpansionModule, MatCheckboxModule } from '@angular/material';
import { AgendaListaComponent } from '../../pages/agenda-lista/agenda-lista.component';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
// importar http
import { HttpClientModule } from '@angular/common/http';
import { Paso1Component, DialogSeguimiento } from '../../pages/paso1/paso1.component';
// importar servicio
import { SnackserviceService } from '../../services/snackservice.service';
import { CalendarioComponent, DialogOverView } from '../../pages/calendario/calendario.component';
// importar el componente fullcalendar
import { FullCalendarModule } from '@fullcalendar/angular';
// importamos el guards
import { AuthGuard } from '../../guards/auth.guard';
// importamos los roles
import { Role } from '../../models/role';
// importar resolver
import { Resolver } from '../../resolver/resolver';
// importat stat module
import { StatModuleModule } from '../../shared/stat-module.module';
// seguimiento
import { SeguimientoComponent } from '../../pages/seguimiento/seguimiento.component';
// componente ForbiddenComponent
import { ForbiddenComponent } from '../../pages/forbidden/forbidden.component';
// cursos
import { CatcursoComponent, BottomSheet } from '../../pages/catcurso/catcurso.component';
// importar resolver del curso
import { RecordCompService } from '../../resolver/record-comp.service';
// importar resolve del calendario
import { CalendarioService } from '../../resolver/calendario.service';
// importar el resolve del seguimiento
import { SeguimientoService } from '../../resolver/seguimiento.service';
// agregar time picke
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
// importar el servicio detalle
import { DetallesServiceService } from '../../resolver/detalles-service.service';
// importar resolver detalle seguimiento
import { DetalleSeguimientoResolver } from '../../resolver/detalle-seguimiento-resolver';
// importar resolver
import { IncidenciaResolver } from '../../resolver/incidencia-resolver';
// importar resolver fileserver
import { Filesresolver } from '../../resolver/filesresolver';
// importar componente
import { HistoricoComponentComponent } from '../../pages/historico-component/historico-component.component';
// importar resolver historico
import { Historicodirectores } from '../../resolver/historicodirectores';
// importar cuestionario componente
import { EncuestaComponent } from '../../pages/encuesta/encuesta.component';
// importar componente hijo cursos
import { ChildPaso1CursoComponent } from '../../pages/child-paso1-curso/child-paso1-curso.component';
// importar resolver
import { RolResolver } from '../../resolver/rol-resolver';
// dialogo
import { DialogrefviewComponent } from '../../pages/dialogrefview/dialogrefview.component';
// importar resolver pdf
import { Filepdfresolver } from '../../resolver/filepdfresolver';
// importar componente de cuestionario dnc
import { CuestionariodncseguimientoComponent } from '../../pages/cuestionariodncseguimiento/cuestionariodncseguimiento.component';

// rutas
const ClientLayoutRoutes: Routes = [
  {
    path: 'index',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Directores', 'Vinculador'] },
    resolve: { roldata: RolResolver}
  },
  {
    path: 'agenda',
    component: AgendaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Directores'] }
  },
  {
    path: 'listaagenda',
    component: AgendaListaComponent,
    canActivate: [AuthGuard],
    resolve: { Agendas: Resolver},
    data: { roles: ['Directores'] }
  },
  { path: 'detalle/:idvinculacion', pathMatch: 'full', component: Paso1Component, canActivate: [AuthGuard], data: { roles: ['Vinculador'] },
  resolve: {
    getAgenda: SeguimientoService, // primer resolver
    detalles: DetalleSeguimientoResolver, // segundo resolver
    incidenciaResolve: IncidenciaResolver, // tercer resolver
    archivos: Filesresolver, // cuarto resolver
    archivosPdf: Filepdfresolver //quinto resolver
  }},
  { path: 'calendario', component: CalendarioComponent, canActivate: [AuthGuard], data: { roles: ['Vinculador'] },
  resolve: { getAllOwnAgenda: CalendarioService}},
  { path: 'seguimiento/:idvinculacion', pathMatch: 'full', component: SeguimientoComponent, canActivate: [AuthGuard],
  resolve: {
    seguimientos: DetallesServiceService, // primer resolve
    detalleSegimiento: DetalleSeguimientoResolver, // segundo resolve
    archivosResolver: Filesresolver // tercer resolver
  }},
  { path: 'forbidden', component: ForbiddenComponent, canActivate: [AuthGuard] },
  { path: 'cursos', component: CatcursoComponent, canActivate: [AuthGuard], resolve: { getAllCursos: RecordCompService}},
  { path: 'historico',
    component: HistoricoComponentComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Directores'] },
    resolve: { historico: Historicodirectores}
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ClientLayoutRoutes),
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    HttpClientModule,
    MatRadioModule,
    MatSortModule,
    FullCalendarModule, // importamos fullcalendar
    StatModuleModule,
    MatChipsModule, // chips
    MatExpansionModule,
    MatCheckboxModule, // checkbox
    NgxMaterialTimepickerModule,
  ],
  declarations: [
    AgendaComponent,
    AgendaListaComponent,
    DashboardComponent,
    Paso1Component,
    ErrorSnackComponent,
    CalendarioComponent,
    SeguimientoComponent,
    ForbiddenComponent,
    CatcursoComponent,
    BottomSheet,
    DialogOverView,
    DialogSeguimiento,
    HistoricoComponentComponent,
    EncuestaComponent,
    ChildPaso1CursoComponent,
    DialogrefviewComponent,
    CuestionariodncseguimientoComponent
  ],
  providers: [
    SnackserviceService,
    AuthGuard,
  ],
  exports: [
    RouterModule
  ], // exportar
  entryComponents: [BottomSheet, DialogOverView, DialogSeguimiento, DialogrefviewComponent]
})
export class ClientLayoutModule { }
