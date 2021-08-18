export class Seat {
  constructor(
    public id: number,
    public row: number,
    public number: number,
    public taken: boolean,
    public isSelected: boolean
  ) {}
}
