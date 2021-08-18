import { NgModule } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { SafePipe } from 'src/app/pipes/safe.pipe';
import { ShortenPipe } from 'src/app/pipes/shorten.pipe';
import { TicketComponent } from './ticket/ticket.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPrintModule } from 'ngx-print';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  imports: [
    FontAwesomeModule,
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    NgxPrintModule,
    FormsModule
  ],
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    SafePipe,
    ShortenPipe,
    TicketComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    RouterModule,
    SafePipe,
    ShortenPipe,
    TicketComponent,
    NgxPrintModule,
    SidebarComponent
  ],
})
export class SharedModule {}
