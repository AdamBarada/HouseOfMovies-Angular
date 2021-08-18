import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { ChartData } from "../models/chartData.model";

@Injectable({
  providedIn: "root",
})
export class AdminReservationService {
  constructor(private http: HttpClient, private datePipe: DatePipe) {}

  getReservationsChartData() {
    return this.http
      .get<ChartData[]>(
        `${environment.url}admin/request/reservations/per-categories/last-week/`
      )
      .pipe(
        map((response) => {
          const data: ChartData[] = [];
          response.forEach((dataSample) => {
            let series: { value: number; name: string }[] = [];
            dataSample.series.forEach((curValue) => {
              let value = curValue.value;
              let date: Date = new Date(curValue.name);
              let name: string = this.datePipe.transform(date, "MMM d") || "";
              series.push({ value, name });
            });
            data.push(new ChartData(dataSample.name, series));
          });
          return data;
        })
      );
  }

  getReservationsDetails() {
    return this.http
      .get<{ totalNumber: number; totalIncome: number | number[] }>(
        `${environment.url}admin/request/reservations/total-numbers/`
      )
  }
}
