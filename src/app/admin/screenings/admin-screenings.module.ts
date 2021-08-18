import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ScreeningsComponent } from "./screenings.component";
import { NgxSpinnerModule } from "ngx-spinner";
import { DataTablesModule } from "angular-datatables";
import { SharedModule } from "src/app/client/shared/shared.module";
import { AdminScreeningsRoutingModule } from "./admin-screenings-routing.module";
import { ModalModule } from "ngx-bootstrap/modal";
import { FormsModule } from "@angular/forms";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { TimepickerModule } from "ngx-bootstrap/timepicker";

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    SharedModule,
    DataTablesModule,
    AdminScreeningsRoutingModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    TimepickerModule.forRoot(),
    NgxSpinnerModule,
  ],
  declarations: [ScreeningsComponent],
  providers: [DatePipe]
})
export class AdminScreeningsModule {}
