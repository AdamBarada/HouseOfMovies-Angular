import {
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import {
  faPlayCircle,
  faCalendarAlt,
  faCheckCircle,
  faStopwatch,
} from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { ScreeningService } from "src/app/services/screening.service";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Screening } from "src/app/models/screening.model";
import { ReservationService } from "src/app/services/reservation.service";
import { Seat } from "src/app/models/seat.model";
import { Reservation } from "src/app/models/reservation.model";
import { Category } from "src/app/models/category.model";

@Component({
  selector: "app-screening-detail",
  templateUrl: "./screening-detail.component.html",
  styleUrls: ["./screening-detail.component.sass"],
})
export class ScreeningDetailComponent implements OnInit {
  faPlayCircle = faPlayCircle;
  faClock = faClock;
  faCalendarAlt = faCalendarAlt;
  faStopwatch = faStopwatch;
  faCheckCircle = faCheckCircle;
  screening?: Screening;
  modalRef!: BsModalRef;
  currentTrailer: string = "";
  totalPrice: number = 0;
  totalSeats: number = 0;
  id: string = "";
  @ViewChild("firstEl")
  myIdentifier?: ElementRef;
  reservation?: Reservation;

  constructor(
    private screeningService: ScreeningService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private modalService: BsModalService,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    this.spinner.show(undefined, {
      color: "#4562F2",
      bdColor: "#292B41",
    });
    this.route.paramMap.subscribe((params) => {
      if (!params.has("id")) {
        this.router.navigate(["./home"]);
        return;
      }
      this.id = params.get("id") || "1";
      this.screeningService.getScreeningDetail(+this.id).subscribe(
        (resData) => {
          this.screening = resData;
          if (this.screening.room.seats.length === 0)
            this.screeningService
              .getSeats(this.screening.id)
              .subscribe((seats) => {
                this.screening?.room.seats
                  ? (this.screening.room.seats = seats)
                  : "";
              });
          this.spinner.hide();
        },
        (errorRes) => {
          this.spinner.hide();
          this.router.navigateByUrl("/error/accessDenied");
        }
      );
    });
  }

  openModal(template: TemplateRef<any>, trailer: string | undefined) {
    this.currentTrailer = trailer || "";
    this.modalRef = this.modalService.show(template, {
      class: "modal-dialog-centered",
    });
  }

  onSelect(i: number, j: number) {
    const position = i * (this.screening?.room?.nbColumns || 0) + j;
    if (this.screening?.room?.seats?.[position]?.taken) return;
    let state: boolean =
      this.screening?.room?.seats?.[position]?.isSelected || false;
    if (this.screening?.room.seats[position].isSelected !== undefined)
      this.screening.room.seats[position].isSelected = !state;
    if (!state) {
      this.totalSeats++;
      this.totalPrice += this.screening?.price || 0;
    } else {
      this.totalSeats--;
      this.totalPrice -= this.screening?.price || 0;
    }
  }

  setStyle(i: number, j: number) {
    const position = i * (this.screening?.room?.nbColumns || 0) + j;

    let takenStyle = {
      fill: "#FE2525",
      cursor: "not-allowed",
    };

    let availableStyle = {
      fill: "#707070",
    };

    let selectedStyle = {
      fill: "#4562F2",
    };

    if (this.screening?.room?.seats?.[position]?.taken) return takenStyle;

    return this.screening?.room?.seats?.[position]?.isSelected
      ? selectedStyle
      : availableStyle;
  }

  onAddReservation(template: TemplateRef<any>) {
    this.spinner.show(undefined, {
      color: "#4562F2",
    });

    let seatIds: Seat[] =
      this.screening?.room?.seats?.filter((seat) => {
        return seat.isSelected;
      }) || [];
    let ids: number[] = [];
    seatIds.forEach((seat) => {
      ids.push(seat.id);
    });
    this.reservationService
      .addReservation(+this.id, ids)
      .subscribe((resData) => {
        this.reservation = resData;
        this.reservation?.seatsReserved.forEach((seat) => {
          for (let i = 0; i < (this.screening?.room.seats.length || 0); i++) {
            if (this.screening?.room.seats[i].id === seat.id) {
              this.screening.room.seats[i].taken = true;
              this.screening.room.seats[i].isSelected = false;
            }
            this.totalPrice = 0;
            this.totalSeats = 0;
          }
        });
        this.spinner.hide();
        this.modalRef = this.modalService.show(template, {
          class: "modal-dialog-centered",
        });
      });
  }

  printCategories(categories?: Category[]) {
    let text = "";
    categories?.forEach((category) => {
      text += category.name + ", ";
    });
    let index = text.lastIndexOf(",");
    text = text.substring(0, index);
    return text;
  }

  confirm(): void {
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }
}
