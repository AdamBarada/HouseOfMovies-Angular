import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../shared/shared.module';
import { MoviesComponent } from './movies.component';
import { MoviesRoutingModule } from './movies-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ModalModule } from 'ngx-bootstrap/modal';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    SharedModule,
    MoviesRoutingModule,
    NgxSpinnerModule,
    InfiniteScrollModule,
    ModalModule.forRoot(),
  ],
  declarations: [MoviesComponent],
})
export class MoviesModule {}
