import { Pool } from "pg";

import { Review } from "../domain/Review";
import { ReviewRepository } from "../domain/ReviewRepository";

export default class ReviewRepositoryImpl implements ReviewRepository {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  public async createReview(review: Review): Promise<Review> {
    const query =
      "INSERT INTO reviews (id, book_id, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [review.id, review.bookId, review.rating, review.comment];
    const result = await this.pool.query(query, values);
    const createdReview = result.rows[0];
    return new Review(
      createdReview.id,
      createdReview.book_id,
      createdReview.rating,
      createdReview.comment
    );
  }
}
