import { DatePipe } from "@angular/common";
import {
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import {
  faCalendarDay,
  faChartPie,
  faCheck,
  faFilm,
  faImage,
  faPencilAlt,
  faPlus,
  faPortrait,
  faStopwatch,
  faTimesCircle,
  faTrash,
  faUsers,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { DataTableDirective } from "angular-datatables";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { Category } from "src/app/models/category.model";
import { Movie } from "src/app/models/movie.model";
import { MovieProto } from "src/app/models/movieProto.model";
import { AdminMoviesService } from "src/app/services/admin-movies.service";
import { CategoryService } from "src/app/services/category.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-movies",
  templateUrl: "./movies.component.html",
  styleUrls: ["./movies.component.sass"],
})
export class MoviesComponent implements OnInit {
  isEnabled: boolean = false;
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;
  faFilm = faFilm;
  faCheck = faCheck;
  faUserTie = faUserTie;
  faAdd = faPlus;
  faCalendarDay = faCalendarDay;
  faVideo = faYoutube;
  faChartPie = faChartPie;
  faImage = faImage;
  faStopWatch = faStopwatch;
  faPortrait = faPortrait;
  faUsers = faUsers;
  faTimesCircle = faTimesCircle;
  isChecked = false;
  currentMovie: number = -1;
  dtOptions: DataTables.Settings = {};
  movies: Movie[] = [];
  isAdd: boolean = false;
  selectedDate: Date = new Date();
  portraitUrl: string = "";
  landscapeUrl: string = "";
  dtTrigger: Subject<any> = new Subject<any>();
  myIdentifier?: ElementRef;
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective | undefined;
  modalRef!: BsModalRef;
  modalRefPreview!: BsModalRef;
  dropdownList: Category[] = [];
  selectedItems: Category[] = [];
  dropdownSettings: IDropdownSettings = {};

  constructor(
    private moviesService: AdminMoviesService,
    private modalService: BsModalService,
    private categoriesService: CategoryService,
    private spinner: NgxSpinnerService,
    private toast: ToastrService,
    public datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.spinner.show(undefined, {
      color: "#4562F2",
      bdColor: "#292B41",
    });
    this.dtOptions = {
      lengthChange: false,
      autoWidth: false,
      pageLength: 10,
      language: {
        searchPlaceholder: "Search for available movies...",
      },
      columnDefs: [
        { type: "date", targets: [1] },
        { type: "date", targets: [2] },
      ],
    };

    this.moviesService.getMovies().subscribe((resData) => {
      this.movies = resData;
      this.dtTrigger.next();
      this.spinner.hide();
    });
  }

  setChecked(event: boolean) {
    this.isChecked = event;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: "modal-dialog-centered",
      ignoreBackdropClick: true,
    });
  }

  confirm(): void {
    let id = this.movies[this.currentMovie].id;
    this.modalRef.hide();
    this.spinner.show(undefined, {
      color: "#4562F2",
      bdColor: "#292B41",
    });
    this.moviesService.deleteMovie(id).subscribe((resData) => {
      let updatedMovies = this.movies.filter((res) => {
        return res.id !== id;
      });
      this.movies = [];
      this.movies.push(...updatedMovies);
      this.rerender();
      this.spinner.hide();
      this.toast.success(
        "Selected movie has been successfully deleted.",
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

  onSelectPortrait(e: any) {
    if (e.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.portraitUrl = event.target.result;
      };
    }
  }

  onSelectLandscape(e: any) {
    if (e.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.landscapeUrl = event.target.result;
      };
    }
  }

  decline(): void {
    this.currentMovie = -1;
    this.portraitUrl = "";
    this.landscapeUrl = "";
    this.selectedItems = [];
    this.modalRef.hide();
  }

  onActionMovie(
    id: number,
    template: TemplateRef<any>,
    isDelete: boolean,
    isPreview?: boolean
  ) {
    this.isAdd = false;
    this.currentMovie = id;
    if (isPreview) this.openPreviewModal(template);
    else if (!isDelete) {
      this.updateCategories();
      this.portraitUrl = this.movies[this.currentMovie].portraitImg;
      this.landscapeUrl = this.movies[this.currentMovie].landscapeImg;
      this.selectedDate = this.movies[this.currentMovie].releaseDate;
      this.openModal(template);
    } else this.openModal(template);
  }

  onAddMovie(
    template: TemplateRef<any>,
    isImgPreview: boolean,
    isLandscape?: boolean
  ) {
    this.isAdd = true;
    this.updateCategories();
    if (isImgPreview && isLandscape && this.landscapeUrl == "")
      this.toast.error(
        "Landscape image not uploaded yet, please upload an image and try again!",
        "No image found.",
        {
          progressBar: true,
        }
      );
    else if (isImgPreview && !isLandscape && this.portraitUrl == "")
      this.toast.error(
        "Portrait image not uploaded yet, please upload an image and try again!",
        "No image found.",
        {
          progressBar: true,
        }
      );
    else if (isImgPreview) this.openPreviewModal(template);
    else this.openModal(template);
  }

  openPreviewModal(template: TemplateRef<any>) {
    this.modalRefPreview = this.modalService.show(template, {
      class: "modal-dialog-centered",
    });
  }

  updateCategories() {
    this.categoriesService.getCategories().subscribe((categories) => {
      this.dropdownList = categories;
    });

    if (this.currentMovie !== -1)
      this.selectedItems = this.movies[this.currentMovie].categories;

    this.dropdownSettings = {
      singleSelection: false,
      idField: "id",
      textField: "name",
      selectAllText: "Select All",
      unSelectAllText: "Unselect All",
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
  }

  onSubmit(f: NgForm) {
    let categories: number[] = [];
    f.form.value.categories.forEach((category: Category) => {
      categories.push(category.id);
    });
    let portrait: string | null = this.portraitUrl.includes("http")
      ? ""
      : this.portraitUrl;
    let landscape: string | null = this.landscapeUrl.includes("http")
      ? ""
      : this.landscapeUrl;
    let date: string =
      this.datepipe.transform(f.form.value.date, "yyyy-MM-dd") || "";

    let updatedMovie: MovieProto;

    if (environment.url.includes("8000")) {
      if (portrait === "") portrait = null;
      if (landscape === "") landscape = null;
      updatedMovie = new MovieProto(
        f.form.value.title,
        f.form.value.description,
        f.form.value.director,
        f.form.value.duration,
        f.form.value.video,
        f.form.value.cast,
        date,
        portrait,
        landscape,
        undefined,
        categories
      );
      console.log(updatedMovie);
    } else {
      updatedMovie = new MovieProto(
        f.form.value.title,
        f.form.value.description,
        f.form.value.director,
        f.form.value.duration,
        f.form.value.video,
        f.form.value.cast,
        date,
        portrait,
        landscape,
        categories
      );
    }

    if (!this.isAdd)
      this.moviesService
        .updateMovie(updatedMovie, this.movies[this.currentMovie].id)
        .subscribe(
          (response) => {
            this.modalRef.hide();
            this.spinner.show(undefined, {
              color: "#4562F2",
              bdColor: "#292B41",
            });
            this.moviesService.getMovies().subscribe((moviesData) => {
              this.movies = moviesData;
              this.rerender();
              this.spinner.hide();
              this.onFormAccepted();
            });
          },
          (error) => this.onFormNotValid()
        );
    else
      this.moviesService.addMovie(updatedMovie).subscribe(
        (response) => {
          this.modalRef.hide();
          this.spinner.show(undefined, {
            color: "#4562F2",
            bdColor: "#292B41",
          });
          this.moviesService.getMovies().subscribe((moviesData) => {
            this.movies = moviesData;
            this.rerender();
            this.spinner.hide();
            this.onFormAccepted();
          });
        },
        (error) => this.onFormNotValid()
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
      "Inputs are not valid, check your inputs and try again.",
      "Invalid Form",
      {
        progressBar: true,
      }
    );
  }
}
