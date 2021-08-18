import {
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { Router } from "@angular/router";
import {
  faPlayCircle,
  faReceipt,
  faPrint,
  faTrash,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { DataTableDirective } from "angular-datatables";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { Reservation } from "src/app/models/reservation.model";
import { ReservationService } from "src/app/services/reservation.service";

@Component({
  selector: "app-reservations",
  templateUrl: "./reservations.component.html",
  styleUrls: ["./reservations.component.sass"],
})
export class ReservationsComponent implements OnInit {
  isEnabled: boolean = false;
  faPlayCircle = faPlayCircle;
  faReceipt = faReceipt;
  faPrint = faPrint;
  faTrash = faTrash;
  faTimesCircle = faTimesCircle;
  currentRes: number = 0;
  currentTrailer: string = "";
  dtOptions: DataTables.Settings = {};
  reservations: Reservation[] = [];
  dtTrigger: Subject<any> = new Subject<any>();
  modalRef!: BsModalRef;
  @ViewChild("firstEl")
  myIdentifier?: ElementRef;
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective | undefined;

  constructor(
    private reservationService: ReservationService,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService,
    private toast: ToastrService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.spinner.show(undefined, {
      color: "#4562F2",
      bdColor: "#292B41",
    });
    this.dtOptions = {
      lengthChange: false,
      pageLength: 10,
      language: {
        searchPlaceholder: "Search for movie, room, date...",
      },
      columnDefs: [
        { type: "date", targets: [1] },
        { type: "date", targets: [2] },
      ],
      order: [
        [1, "asc"],
        [2, "asc"],
      ],
    };

    this.reservationService.getUserReservations().subscribe(
      (resData) => {
        this.reservations = resData;
        this.dtTrigger.next();
        this.spinner.hide();
      },
      (errRes) => {
        if (errRes.error.status === 401) {
          this.router.navigateByUrl("/error/accessDenied");
          this.spinner.hide();
        }
      }
    );
  }

  openModal(template: TemplateRef<any>, trailer: string | undefined) {
    this.currentTrailer = trailer || "";
    this.modalRef = this.modalService.show(template, {
      class: "modal-dialog-centered",
    });
  }

  confirm(): void {
    let id = this.currentRes;
    this.modalRef.hide();
    this.spinner.show(undefined, {
      color: "#4562F2",
      bdColor: "#292B41",
    });
    this.reservationService.deleteReservation(id).subscribe((resData) => {
      let updatedReservations = this.reservations.filter((res) => {
        return res.id !== id;
      });
      this.reservations = [];
      this.reservations.push(...updatedReservations);
      this.rerender();
      this.spinner.hide();
      this.toast.success(
        "Your reservation has been successfully deleted.",
        "Delete successful",
        {
          progressBar: true,
        }
      );
    });
  }

  rerender(): void {
    this.dtElement?.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  decline(): void {
    this.modalRef.hide();
  }

  onDeleteReservation(id: number, template: TemplateRef<any>) {
    this.currentRes = id;
    this.openModal(template, undefined);
  }
}
