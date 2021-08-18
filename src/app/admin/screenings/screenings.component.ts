import { DatePipe } from "@angular/common";
import {
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import {
  faCalendarDay,
  faCheck,
  faDollarSign,
  faDoorOpen,
  faFilm,
  faPencilAlt,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { DataTableDirective } from "angular-datatables";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { Movie } from "src/app/models/movie.model";
import { Room } from "src/app/models/room.model";
import { Screening } from "src/app/models/screening.model";
import { ScreeningProto } from "src/app/models/screeningProto.model";
import { ScreeningProtoDjango } from "src/app/models/screeningProtoDjango.model";
import { AdminMoviesService } from "src/app/services/admin-movies.service";
import { AdminScreeningService } from "src/app/services/admin-screening.service";
import { RoomsService } from "src/app/services/rooms.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-screenings",
  templateUrl: "./screenings.component.html",
  styleUrls: ["./screenings.component.sass"],
})
export class ScreeningsComponent implements OnInit {
  isEnabled: boolean = false;
  isTimeValid: boolean = false;
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;
  faTimesCircle = faTimesCircle;
  isChecked = false;
  faAdd = faPlus;
  faCalendarDay = faCalendarDay;
  faFilm = faFilm;
  faDollar = faDollarSign;
  faDoorOpen = faDoorOpen;
  faCheck = faCheck;
  isAdd: boolean = false;
  movies: Movie[] = [];
  rooms: Room[] = [];
  selectedDate = new Date();
  currentScreening: number = -1;
  selectedTime = new Date();
  selectedMovieItems: { id: number; name: string }[] = [];
  selectedScreeningItems: { id: number; name: string }[] = [];
  dtOptions: DataTables.Settings = {};
  screenings: Screening[] = [];
  dropdownMovieList: { id: number; name: string }[] = [];
  dropdownRoomList: { id: number; name: string }[] = [];
  dropdownSettings: IDropdownSettings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  myIdentifier?: ElementRef;
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective | undefined;
  modalRef!: BsModalRef;

  constructor(
    private screeningsService: AdminScreeningService,
    private roomsService: RoomsService,
    private moviesService: AdminMoviesService,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService,
    private toast: ToastrService,
    private datePipe: DatePipe
  ) {}
  ngOnInit(): void {
    this.spinner.show(undefined, {
      color: "#4562F2",
      bdColor: "#292B41",
    });

    this.loadMovies();
    this.loadRooms();

    this.dtOptions = {
      lengthChange: false,
      autoWidth: false,
      pageLength: 10,
      language: {
        searchPlaceholder: "Search for available screenings...",
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

    this.dropdownSettings = {
      singleSelection: true,
      closeDropDownOnSelection: true,
      idField: "id",
      textField: "name",
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };

    this.screeningsService.getScreenings().subscribe((resData) => {
      this.screenings = resData.filter((screening) => {
        return screening.status === "AVAILABLE";
      });
      this.dtTrigger.next();
      this.spinner.hide();
    });
  }

  setChecked(event: boolean) {
    this.isChecked = event;
  }

  setValid(event: boolean) {
    this.isTimeValid = event;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: "modal-dialog-centered",
      ignoreBackdropClick: true,
    });
  }

  confirm(): void {
    let id = this.currentScreening;
    this.modalRef.hide();
    this.spinner.show(undefined, {
      color: "#4562F2",
      bdColor: "#292B41",
    });
    this.screeningsService.deleteScreening(id).subscribe((resData) => {
      let updatedScreenings = this.screenings.filter((res) => {
        return res.id !== id;
      });
      this.screenings = [];
      this.screenings.push(...updatedScreenings);
      this.rerender();
      this.spinner.hide();
      this.toast.success(
        "Selected Screening has been successfully deleted.",
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

  loadMovies() {
    if (this.movies.length == 0) {
      this.moviesService.getMovies().subscribe((moviesData) => {
        this.movies = moviesData;
        this.movies.forEach((movie: Movie) => {
          let id = movie.id;
          let name = movie.title;
          this.dropdownMovieList.push({ id, name });
        });
      });
    }
  }

  loadRooms() {
    if (this.rooms.length == 0) {
      this.roomsService.getRooms().subscribe((rooms) => {
        this.rooms = rooms;
        this.rooms.forEach((room: Room) => {
          let id = room.id;
          let name = room.name;
          this.dropdownRoomList.push({ id, name });
        });
      });
    }
  }

  decline(): void {
    this.isTimeValid = false;
    this.currentScreening = -1;
    this.modalRef.hide();
  }

  onDeleteReservation(id: number, template: TemplateRef<any>) {
    this.currentScreening = id;
    this.openModal(template);
  }

  onAddScreening(template: TemplateRef<any>) {
    this.isAdd = true;
    this.openModal(template);
  }

  onEditScreening(template: TemplateRef<any>, ids: number) {
    this.isAdd = false;
    this.currentScreening = ids;
    this.selectedDate = this.screenings[ids].date;
    let id = this.screenings[ids].movie.id;
    let name = this.screenings[ids].movie.title;
    this.selectedMovieItems.pop();
    this.selectedScreeningItems.pop();
    this.selectedMovieItems.push({ id, name });
    id = this.screenings[ids].room.id;
    name = this.screenings[ids].room.name;
    this.selectedScreeningItems.push({ id, name });
    this.selectedTime.setHours(this.selectedDate.getHours());
    this.selectedTime.setMinutes(this.selectedDate.getMinutes());
    this.openModal(template);
  }

  onSubmit(f: NgForm) {
    let newScreening: ScreeningProto | ScreeningProtoDjango;
    if (environment.url.includes("8000")) {
      let time = this.datePipe.transform(f.form.value.time, 'HH:mm:ss') || "";
      let date: string =
      this.datePipe.transform(f.form.value.date, "yyyy-MM-dd") || "";
      console.log(time, date)
      newScreening = new ScreeningProtoDjango(
        f.form.value.movie[0].id,
        f.form.value.room[0].id,
        f.form.value.price,
        date,
        time
      );
    } else {
      newScreening = new ScreeningProto(
        f.form.value.movie[0].id,
        f.form.value.room[0].id,
        f.form.value.price,
        f.form.value.date.getDay(),
        f.form.value.date.getMonth(),
        f.form.value.date.getFullYear(),
        f.form.value.time.getHours(),
        f.form.value.time.getMinutes(),
        f.form.value.time.getSeconds()
      );
    }
    if (this.isAdd)
      this.screeningsService.addScreening(newScreening).subscribe(
        (data) => {
          this.modalRef.hide();
          this.spinner.show(undefined, {
            color: "#4562F2",
            bdColor: "#292B41",
          });
          this.screeningsService.getScreenings().subscribe((screeningData) => {
            this.screenings = screeningData;
            this.rerender();
            this.spinner.hide();
            this.onFormAccepted();
            this.isTimeValid = false;
          });
        },
        () => {
          this.onFormNotValid();
        }
      );
    else
      this.screeningsService
        .editScreening(newScreening, this.screenings[this.currentScreening].id)
        .subscribe(
          (data) => {
            this.modalRef.hide();
            this.spinner.show(undefined, {
              color: "#4562F2",
              bdColor: "#292B41",
            });
            this.screeningsService
              .getScreenings()
              .subscribe((screeningData) => {
                this.screenings = screeningData;
                this.rerender();
                this.spinner.hide();
                this.onFormAccepted();
                this.isTimeValid = false;
              });
          },
          () => {
            this.onFormNotValid();
          }
        );
  }

  onFormAccepted() {
    this.toast.success(
      "Your movies have been successfully updated. ",
      "Movies updated",
      {
        progressBar: true,
      }
    );
  }

  onFormNotValid() {
    this.toast.error(
      "There is already a screening occuring at this time in the specified room.",
      "Invalid Form",
      {
        progressBar: true,
      }
    );
  }
}
