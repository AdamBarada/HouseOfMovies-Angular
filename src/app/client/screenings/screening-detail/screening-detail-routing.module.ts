import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScreeningDetailComponent } from './screening-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ScreeningDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScreeningDetailRoutingModule {}
