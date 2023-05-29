import { Review } from "./Review";

export interface ReviewRepository {
  createReview(review: Review): Promise<Review>;
}
