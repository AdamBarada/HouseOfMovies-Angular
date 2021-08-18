import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home.component";
import { HomeRoutingModule } from "./home-routing.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { CarouselModule } from "ngx-owl-carousel-o";
import { SharedModule } from "../shared/shared.module";
import { NgxSpinnerModule } from "ngx-spinner";
import { ModalModule } from "ngx-bootstrap/modal";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    FontAwesomeModule,
    CarouselModule,
    SharedModule,
    FormsModule,
    NgxSpinnerModule,
    ModalModule.forRoot(),
  ],
  declarations: [HomeComponent],
})
export class HomeModule {}


