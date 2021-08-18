import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../../shared/shared.module';
import { MovieComponent } from './movie.component';
import { MovieRoutingModule } from './movie-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    SharedModule,
    MovieRoutingModule,
    NgxSpinnerModule
  ],
  declarations: [MovieComponent],
})
export class MovieModule {}
