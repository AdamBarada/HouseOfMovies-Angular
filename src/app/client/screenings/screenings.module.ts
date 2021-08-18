import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ScreeningsComponent } from './screenings.component';
import { ScreeningsRoutingModule } from './screenings-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  imports: [
    CommonModule,
    ScreeningsRoutingModule,
    FontAwesomeModule,
    SharedModule,
    NgxSpinnerModule,
    DataTablesModule,
    ModalModule.forRoot(),
  ],
  declarations: [ScreeningsComponent],
})
export class ScreeningsModule {}
