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
// impoertar componente cursos seguimiento
import { SeguimientoscursosComponent } from '../../pages/seguimientoscursos/seguimientoscursos.component';
// importar resolver
import { CountagendaService } from '../../resolver/countagenda-service';
// importar resolver lista agenda
import { Listaagendaresolver } from '../../resolver/listaagendaresolver';
// importar dashboard admin
import { AdminDashboardComponent } from '../../pages/admin-dashboard/admin-dashboard.component';
// charts
import { ChartsModule } from 'node_modules/ng2-charts';
// importcar componente dashboard admin details
import { AdmindashboardetailsComponent } from '../../pages/admindashboardetails/admindashboardetails.component';
// importar resolver
import { VinculadoragendaResolver } from '../../resolver/vinculadoragenda-resolver';
// importar componente
import { AgendasasignadasComponent } from '../../pages/agendasasignadas/agendasasignadas.component';
// importar resolver
import { AgendasasignadasResolverService } from '../../resolver/agendasasignadas-resolver.service';
// importar componente perfil
import { ProfileComponent } from '../../pages/profile/profile.component';
import { VinculadoresComponent } from '../../pages/vinculadores/vinculadores.component';
// resolve
import { Vinculadorjefe } from '../../resolver/vinculadorjefe';
// importar resolver
import { Historicaldetailresolver } from '../../resolver/historicaldetailresolver';
// agregar componente historico detalle
import { HistoricaldetailComponent } from '../../pages/historicaldetail/historicaldetail.component';
// importar componente historico vinculador
import { HistoricovinculacionComponent } from '../../pages/historicovinculacion/historicovinculacion.component';
import { HistoricoVinculadorResolver } from '../../resolver/historico-vinculador-resolver';
// importar componente
import { SeguimientoReporteComponent } from '../../pages/seguimiento-reporte/seguimiento-reporte.component';
// importar el control del archivo
import { FileControlModule } from '../../../../node_modules/ng-validator/index';
// importar imgfileresolver
import { FileImgresolver } from '../../resolver/file-imgresolver';
// rutas
const ClientLayoutRoutes: Routes = [
  {
    path: 'index',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Directores', 'Vinculador', 'Super_usuario'] },
    resolve: { roldata: RolResolver, currentid: CountagendaService}
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
    data: { roles: ['Directores'] },
    resolve: { AgendaLista: VinculadoragendaResolver}
  },
  { path: 'detalle', pathMatch: 'full', component: Paso1Component, canActivate: [AuthGuard], data: { roles: ['Vinculador'] },
  resolve: {
    getAgenda: SeguimientoService, // primer resolver
    detalles: DetalleSeguimientoResolver, // segundo resolver
    incidenciaResolve: IncidenciaResolver, // tercer resolver
    archivos: FileImgresolver, // cuarto resolver
    archivosPdf: Filepdfresolver // quinto resolver
  }},
  { path: 'calendario', component: CalendarioComponent, canActivate: [AuthGuard], data: { roles: ['Vinculador'] },
  resolve: { getAllOwnAgenda: CalendarioService}},
  { path: 'seguimiento', pathMatch: 'full', component: SeguimientoComponent, canActivate: [AuthGuard], data: { roles: ['Directores'] },
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
  },
  {
    path: 'admindashboard-detalle/:idunidad',
    pathMatch: 'full',
    component: AdmindashboardetailsComponent,
    canActivate: [AuthGuard],
    // data: { roles: ['Super-usuario'] }
    data: { roles: ['Super_usuario'] }
  },
  {
    path: 'agendasasignadas/:idUsuario',
    pathMatch: 'full',
    component: AgendasasignadasComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Directores'] },
    resolve: { asignados: AgendasasignadasResolverService}
  },
  {
    path: 'profile',
    pathMatch: 'full',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'vinculadores',
    pathMatch: 'full',
    component: VinculadoresComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Directores'] },
    resolve: { getvinculadores: Vinculadorjefe}
  },
  {
    path: 'historicodetalle',
    pathMatch: 'full',
    component: HistoricaldetailComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Directores'] },
    resolve: { getdetallehistorico: Historicaldetailresolver}
  },
  {
    path: 'historicovinculador',
    pathMatch: 'full',
    component: HistoricovinculacionComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Vinculador'] },
    resolve: { getdetallevinculador: HistoricoVinculadorResolver }
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
    ChartsModule, // charts
    FileControlModule // filecontrol
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
    CuestionariodncseguimientoComponent,
    SeguimientoscursosComponent,
    AdminDashboardComponent,
    AdmindashboardetailsComponent,
    AgendasasignadasComponent,
    ProfileComponent,
    VinculadoresComponent,
    HistoricaldetailComponent,
    HistoricovinculacionComponent,
    SeguimientoReporteComponent
  ],
  providers: [
    SnackserviceService,
    AuthGuard,
  ],
  exports: [
    RouterModule,
    ChartsModule
  ], // exportar
  entryComponents: [BottomSheet, DialogOverView, DialogSeguimiento, DialogrefviewComponent]
})
export class ClientLayoutModule { }
