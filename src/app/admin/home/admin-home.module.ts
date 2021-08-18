import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HomeComponent } from './home.component';
import { AdminHomeRoutingModule } from './admin-home-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/client/shared/shared.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  imports: [
    CommonModule,
    AdminHomeRoutingModule,
    FontAwesomeModule,
    SharedModule,
    NgxChartsModule,
    FormsModule,
    NgxSpinnerModule
  ],
  declarations: [HomeComponent],
  providers: [DatePipe]

})
export class AdminHomeModule {}
