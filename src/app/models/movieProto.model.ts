export class MovieProto {

  constructor(
    public title: string,
    public description: string,
    public director: string,
    public duration: number,
    public trailer: string,
    public cast: string,
    public releaseDate: string,
    public image: string | null,
    public landscape: string | null,
    public categories?: number[],
    public categoriesId?: number[],
  ) {}

}
