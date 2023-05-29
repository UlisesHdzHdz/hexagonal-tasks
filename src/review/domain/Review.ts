export class Review {
  constructor(
    readonly id: string,
    readonly bookId: string,
    readonly rating: number,
    readonly comment: string
  ) {}
}
