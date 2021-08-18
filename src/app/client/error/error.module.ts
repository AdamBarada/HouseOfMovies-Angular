import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Error404Component } from './error404/error404.component';
import { SharedModule } from '../shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ErrorRoutingModule } from './error-routing.module';
import { Error401Component } from './error401/error401.component';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    SharedModule,
    ErrorRoutingModule,
    NgxSpinnerModule,
  ],
  declarations: [Error404Component, Error401Component],
})
export class ErrorModule {}
