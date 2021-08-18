export class ScreeningProtoDjango {
  constructor(
    public movieId: number,
    public roomId: number,
    public price: number,
    public date: string,
    public time: string,
  ) {}
}
