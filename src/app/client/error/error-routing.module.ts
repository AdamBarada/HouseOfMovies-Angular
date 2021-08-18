import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Error401Component } from './error401/error401.component';
import { Error404Component } from './error404/error404.component';

const routes: Routes = [
  {
    path: 'notFound',
    component: Error404Component,
  },
  {
    path: 'accessDenied',
    component: Error401Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ErrorRoutingModule {}
