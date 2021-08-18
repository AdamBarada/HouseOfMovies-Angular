import {
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { faPlayCircle, faReceipt } from "@fortawesome/free-solid-svg-icons";
import { DataTableDirective } from "angular-datatables";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { NgxSpinnerService } from "ngx-spinner";
import { Subject } from "rxjs";
import { Screening } from "src/app/models/screening.model";
import { ScreeningService } from "src/app/services/screening.service";

@Component({
  selector: "app-screenings",
  templateUrl: "./screenings.component.html",
  styleUrls: ["./screenings.component.sass"],
})
export class ScreeningsComponent implements OnInit {
  isEnabled: boolean = false;
  faPlayCircle = faPlayCircle;
  faReceipt = faReceipt;
  currentTrailer: string = "";
  dtOptions: DataTables.Settings = {};
  screenings: Screening[] = [];
  dtTrigger: Subject<any> = new Subject<any>();
  modalRef!: BsModalRef;
  @ViewChild("firstEl")
  myIdentifier?: ElementRef;

  constructor(
    private screeningService: ScreeningService,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute
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

    this.route.queryParamMap.subscribe((params) => {
      this.screeningService.getScreenings().subscribe((resData) => {
        if (params.has("movie")) {
          this.screenings = resData.filter((movie) => {
            return movie.movie.title === params.get("movie");
          });
        } else this.screenings = resData;

        this.dtTrigger.next();
        this.spinner.hide();
      });
    });
  }

  openModal(template: TemplateRef<any>, trailer: string | undefined) {
    this.currentTrailer = trailer || "";
    this.modalRef = this.modalService.show(template, {
      class: "modal-dialog-centered",
    });
  }
}
