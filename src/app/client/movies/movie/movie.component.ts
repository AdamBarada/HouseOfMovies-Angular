import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  faClock,
  faCalendarAlt,
  faEye,
} from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Movie } from 'src/app/models/movie.model';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.sass'],
})
export class MovieComponent implements OnInit {
  faClock = faClock;
  faCalendarAlt = faCalendarAlt;
  faEye = faEye;

  public movie!: Movie;
  private movieSub!: Subscription;
  private moviesSub!: Subscription;

  constructor(
    private moviesService: MoviesService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show(undefined, {
      color: '#4562F2',
      bdColor: '#292B41',
    });
    let id: number | string;
    this.route.paramMap.subscribe((params) => {
      if (!params.has('id')) {
        this.router.navigate(['./home']);
        return;
      }
      id = params.get('id') || 1;
      this.moviesSub = this.moviesService.movies.subscribe((resData) => {
        let res: any;
        res = resData.find((movies) => {
          return movies.id === id;
        });
        if (res) this.movie = res;
        if (!this.movie) {
          this.movieSub = this.moviesService
            .getMovieById(+id)
            .subscribe((resData) => {
              this.movie = resData;
              this.spinner.hide();
            });
        } else this.spinner.hide();
      });
    });
  }

  printCategories(categories?: Category[]) {
    let text = '';
    categories?.forEach((category) => {
      text += category.name + ', ';
    });
    let index = text.lastIndexOf(',');
    text = text.substring(0, index);
    return text;
  }

  ngOnDestroy(): void {
    this.moviesSub?.unsubscribe();
    this.movieSub?.unsubscribe();
  }
}
