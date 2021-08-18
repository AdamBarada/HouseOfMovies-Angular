import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScreeningsComponent } from './screenings.component';

const routes: Routes = [
  {
    path: '',
    component: ScreeningsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScreeningsRoutingModule {}
