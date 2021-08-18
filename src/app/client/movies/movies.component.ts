import { Component, OnInit, TemplateRef } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { NgxSpinnerService } from "ngx-spinner";
import { Subscription } from "rxjs";
import { Movie } from "src/app/models/movie.model";
import { MoviesService } from "src/app/services/movies.service";
import { faPlayCircle, faPlay, faEye } from "@fortawesome/free-solid-svg-icons";
import { Category } from "src/app/models/category.model";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-movies",
  templateUrl: "./movies.component.html",
  styleUrls: ["./movies.component.sass"],
})
export class MoviesComponent implements OnInit {
  isEnabled: boolean = false;
  currentTrailer: string = "";
  modalRef!: BsModalRef;
  moviesSub?: Subscription;
  movies!: Movie[];
  faPlayCircle = faPlayCircle;
  faPlay = faPlay;
  faEye = faEye;
  firstMovies!: Movie[];
  shownMovies!: Movie[];
  isExpanded: boolean = false;
  isBottom: boolean = false;
  isBottomSearch: boolean = false;
  searchMovies: Movie[] = [];
  shownSearchMovies!: Movie[];
  isSearched: boolean = false;
  searchString: string = "";
  isExpandedSearch: boolean = false;

  constructor(
    private moviesService: MoviesService,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.spinner.show("pageSpinner", {
      color: "#4562F2",
      bdColor: "#292B41",
    });

    this.moviesService.getTrendingMovies().subscribe((resData) => {
      this.firstMovies = resData;
    });

    this.moviesSub = this.moviesService.movies.subscribe((resData) => {
      let res = resData;
      if (res.length !== 0) {
        this.movies = res;
        this.shownMovies = res.slice(0, 12);
        this.route.queryParamMap.subscribe((params) => {
          if (params.has("search")) {
            this.spinner.show("pageSpinner", {
              color: "#4562F2",
              bdColor: "#292B41",
            });
            this.searchString = params.get("search") || "";
            this.isSearched = true;
            this.moviesService
              .getSearchedMovies(this.searchString)
              .subscribe((resData) => {
                if (resData.length === 0) {
                  this.spinner.hide("pageSpinner");
                  return;
                }
                this.searchMovies = resData;
                this.shownSearchMovies = resData.slice(0, 12);
                this.spinner.hide("pageSpinner");
              });
          } else this.spinner.hide("pageSpinner");
        });
      } else this.moviesService.getAllMovies().subscribe();
    });
  }

  openModal(template: TemplateRef<any>, trailer: string | undefined) {
    this.currentTrailer = trailer || "";
    this.modalRef = this.modalService.show(template, {
      class: "modal-dialog-centered",
    });
  }

  expand() {
    this.isExpanded = !this.isExpanded;
    if (!this.isExpanded) this.shownMovies = this.movies.slice(0, 12);
    this.isBottom = false;
  }

  expandSearch() {
    this.isExpandedSearch = !this.isExpandedSearch;
    if (!this.isExpandedSearch)
      this.shownSearchMovies = this.searchMovies.slice(0, 12);
    this.isBottomSearch = false;
  }

  goToMovie(id?: number) {
    console.log("entered");
    this.router.navigateByUrl("/movies/" + id);
  }

  onScrollSearch() {
    if (
      this.isExpandedSearch &&
      this.shownSearchMovies.length < this.searchMovies.length
    ) {
      this.spinner.show("loading1", {});
      if (
        !this.movies[this.shownMovies.length + 5] ||
        this.shownSearchMovies.length + 6 == this.searchMovies.length
      ) {
        this.isBottomSearch = true;
        this.shownSearchMovies = this.searchMovies;
        this.spinner.hide("loading1");
      } else
        this.shownSearchMovies = this.searchMovies.slice(
          0,
          this.shownSearchMovies.length + 6
        );
    }
  }

  onScroll() {
    if (this.isExpanded && this.shownMovies.length < this.movies.length) {
      this.spinner.show("loading2", {});
      if (
        !this.movies[this.shownMovies.length + 5] ||
        this.shownMovies.length + 6 == this.movies.length
      ) {
        this.isBottom = true;
        this.shownMovies = this.movies;
        this.spinner.hide("loading2");
      } else
        this.shownMovies = this.movies.slice(0, this.shownMovies.length + 6);
    }
  }

  printCategories(categories: Category[]) {
    let text = "";
    categories.forEach((category) => {
      text += category.name + ", ";
    });
    let index = text.lastIndexOf(",");
    text = text.substring(0, index);
    return text;
  }

  ngOnDestroy() {
    this.moviesSub?.unsubscribe();
  }
}
