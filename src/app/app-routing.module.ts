import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// comun y browser
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
// layouts clientes
import { ClientLayoutComponent } from './layouts/client-layout/client-layout.component';
// layout login
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full',
  },
  {
    path: '',
    component: ClientLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './layouts/client-layout/client-layout.module#ClientLayoutModule',
        data: {preload: true}
      }
    ],
    runGuardsAndResolvers: 'always'
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './layouts/auth-layout/auth-layout.module#AuthLayoutModule'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
