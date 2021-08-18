import { ElementRef, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {
  faEye,
  faCalendarAlt,
  faClock,
} from '@fortawesome/free-regular-svg-icons';
import {
  faPlay,
  faPlayCircle,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/models/movie.model';
import { MoviesService } from 'src/app/services/movies.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit, OnDestroy {
  faEye = faEye;
  faCalendarAlt = faCalendarAlt;
  faPlay = faPlay;
  faClock = faClock;
  faPlayCircle = faPlayCircle;
  faSearch = faSearch;
  customOptions: OwlOptions = {
    loop: true,
    margin: 50,
    autoplayTimeout: 6000,
    autoplay: true,
    autoplayHoverPause: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };

  private moviesSub!: Subscription;
  loadedMovies!: Movie[];
  displayedMovies!: Movie[];
  comingSoonMovies!: Movie[];
  modalRef!: BsModalRef;
  currentTrailer: string = '';
  indicatorWidth = 0;
  indicatorOffset = 0;
  @ViewChild('firstEl')
  myIdentifier1?: ElementRef;
  @ViewChild('secondEl')
  myIdentifier2?: ElementRef;
  @ViewChild('thirdEl')
  myIdentifier3?: ElementRef;
  tabIndex: number = 0;

  constructor(
    private moviesService: MoviesService,
    private spinner: NgxSpinnerService,
    private modalService: BsModalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.spinner.show(undefined, {
      color: '#4562F2',
      bdColor: '#292B41',
    });

    this.moviesService.getAllMovies().subscribe(() => {});
    this.moviesService.getComingMovies().subscribe((moviesData) => {
      this.comingSoonMovies = moviesData;
    });

    this.moviesSub = this.moviesService.movies.subscribe((moviesData) => {
      this.indicatorWidth = this.myIdentifier1?.nativeElement.offsetWidth;
      this.indicatorOffset = this.myIdentifier1?.nativeElement.offsetLeft;
      this.loadedMovies = moviesData;
      this.displayedMovies = this.loadedMovies;
      if (this.loadedMovies.length !== 0)
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
    });
  }

  openModal(template: TemplateRef<any>, trailer: string | undefined) {
    this.currentTrailer = trailer || '';
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog-centered',
    });
  }

  onImageClicked(id: any) {
    this.router.navigateByUrl('movies/' + id);
  }

  printCategories(categories: Category[]) {
    let text = '';
    categories.forEach((category) => {
      text += category.name + ', ';
    });
    let index = text.lastIndexOf(',');
    text = text.substring(0, index);
    return text;
  }

  onActive(event: any) {
    if (event.srcElement.innerText === 'All' && this.tabIndex !== 0) {
      this.displayedMovies = this.loadedMovies;
      this.tabIndex = 0;
    } else if (
      event.srcElement.innerText === 'Coming Soon' &&
      this.tabIndex !== 1
    ) {
      this.displayedMovies = this.comingSoonMovies;
      this.tabIndex = 1;
    } else if (event.srcElement.innerText === 'Latest' && this.tabIndex !== 2) {
      this.displayedMovies = this.loadedMovies.slice(0, 8);
      this.tabIndex = 2;
    }
    this.indicatorOffset =
      event.srcElement.attributes[0].ownerElement.offsetLeft;
    if (!event.path[0].className.includes('pr-0')) {
      this.indicatorWidth =
        event.srcElement.attributes[0].ownerElement.offsetWidth;
    } else {
      this.indicatorWidth =
        event.srcElement.attributes[0].ownerElement.offsetWidth + 40;
    }
  }

  onScroll(event: any) {
    if (this.tabIndex == 0) {
      this.indicatorWidth = this.myIdentifier1?.nativeElement.offsetWidth;
      this.indicatorOffset = this.myIdentifier1?.nativeElement.offsetLeft;
    } else if (this.tabIndex == 1) {
      this.indicatorWidth = this.myIdentifier2?.nativeElement.offsetWidth;
      this.indicatorOffset = this.myIdentifier2?.nativeElement.offsetLeft;
    } else {
      this.indicatorWidth = this.myIdentifier3?.nativeElement.offsetWidth + 40;
      this.indicatorOffset = this.myIdentifier3?.nativeElement.offsetLeft;
    }
  }

  ngOnDestroy(): void {
    this.moviesSub.unsubscribe();
  }
}
