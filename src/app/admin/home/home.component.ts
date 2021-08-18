import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  faDollarSign,
  faTicketAlt,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { NgxSpinnerService } from "ngx-spinner";
import { Movie } from "src/app/models/movie.model";
import { PieData } from "src/app/models/PieData.model";
import { IUserResponseData } from "src/app/models/responses/IUserResponseData.model";
import { AdminMoviesService } from "src/app/services/admin-movies.service";
import { AdminReservationService } from "src/app/services/admin-reservation.service";
import { AdminUserService } from "src/app/services/admin-user.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.sass"],
})
export class HomeComponent implements OnInit {
  isChecked = false;
  isEnabled = false;
  faDollar = faDollarSign;
  faTicket = faTicketAlt;
  faUsers = faUsers;
  chartsData: any;
  totalUsers: number = 0;
  totalRes: number = 0;
  income: number = 0;
  loyalUsers: IUserResponseData[] = [];
  pieChartData: PieData[] = [];
  bestSellingMovies: Movie[] = [];
  upcomingMovies: Movie[] = [];

  constructor(
    private moviesService: AdminMoviesService,
    private usersService: AdminUserService,
    private reservationService: AdminReservationService,
    private spinner: NgxSpinnerService,
    public datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.spinner.show(undefined, {
      color: "#4562F2",
      bdColor: "#292B41",
    });

    this.usersService.getLoyalUsers().subscribe((data) => {
      this.loyalUsers = data;
    });

    this.usersService
      .getNumberOfUsers()
      .subscribe((data) => (this.totalUsers = data.total));

    this.reservationService.getReservationsDetails().subscribe((data) => {
      if (typeof data.totalIncome === "number") this.income = data.totalIncome;
      else this.income = data.totalIncome[0];
      this.totalRes = data.totalNumber;
    });

    this.moviesService.getUpcomingMovies().subscribe((moviesData) => {
      this.upcomingMovies = moviesData;
      this.moviesService.getMoviesDistribution().subscribe((data) => {
        this.pieChartData = data;
      });
    });

    this.moviesService.getTrendingMovies().subscribe((moviesData) => {
      this.bestSellingMovies = moviesData;
      this.reservationService.getReservationsChartData().subscribe((data) => {
        this.chartsData = data;
        this.spinner.hide();
      });
    });

  }

  setChecked(event: boolean) {
    this.isChecked = event;
  }
}
