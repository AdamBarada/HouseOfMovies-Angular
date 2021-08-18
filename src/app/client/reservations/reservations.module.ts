import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DataTablesModule } from 'angular-datatables';
import { ReservationsComponent } from './reservations.component';
import { ReservationsRoutingModule } from './reservations-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    SharedModule,
    ReservationsRoutingModule,
    NgxSpinnerModule,
    DataTablesModule,
    ModalModule.forRoot(),
  ],
  declarations: [ReservationsComponent],
})
export class ReservationsModule {}
