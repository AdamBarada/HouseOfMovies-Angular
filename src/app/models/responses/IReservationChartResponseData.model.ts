export interface IReservationChartResponseData {
  day: string
  date: string
  values: {category: string, reservations: number}[]
}
