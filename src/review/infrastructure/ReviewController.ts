import { Request, Response } from "express";

import ReviewService from "../application/ReviewService";

export default class ReviewController {
  private reviewService: ReviewService;

  constructor(reviewService: ReviewService) {
    this.reviewService = reviewService;
  }

  public async createReview(req: Request, res: Response): Promise<void> {
    try {
      const { bookId, rating, comment } = req.body;
      const review = await this.reviewService.createReview(
        bookId,
        rating,
        comment
      );
      res.status(201).json({ review });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
