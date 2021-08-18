export class ChartData {
  constructor(
    public name: string,
    public series: { value: number; name: string }[]
  ) {}
}
