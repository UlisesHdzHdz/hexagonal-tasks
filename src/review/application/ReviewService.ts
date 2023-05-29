import { v4 as uuidv4 } from "uuid";

import { Review } from "../domain/Review";
import { ReviewRepository } from "../domain/ReviewRepository";

export default class ReviewService {
  private reviewRepository: ReviewRepository;

  constructor(reviewRepository: ReviewRepository) {
    this.reviewRepository = reviewRepository;
  }

  public async createReview(
    bookId: string,
    rating: number,
    comment: string
  ): Promise<Review> {
    const id = uuidv4();
    const review = new Review(id, bookId, rating, comment);
    return this.reviewRepository.createReview(review);
  }
}
