import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MoviesComponent } from './movies.component';
import { AdminMoviesRoutingModule } from './admin-movies-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DataTablesModule } from 'angular-datatables';
import { SharedModule } from 'src/app/client/shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    SharedModule,
    DataTablesModule,
    AdminMoviesRoutingModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    NgxSpinnerModule,
  ],
  declarations: [MoviesComponent],
  providers: [DatePipe]
})
export class MoviesModule {}
