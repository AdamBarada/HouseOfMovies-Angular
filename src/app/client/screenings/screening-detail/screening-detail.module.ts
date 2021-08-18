import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ScreeningDetailRoutingModule } from './screening-detail-routing.module';
import { ScreeningDetailComponent } from './screening-detail.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ScreeningDetailRoutingModule,
    FontAwesomeModule,
    SharedModule,
    NgxSpinnerModule,
    ModalModule.forRoot(),
  ],
  declarations: [ScreeningDetailComponent],
})
export class ScreeningDetailModule {}
