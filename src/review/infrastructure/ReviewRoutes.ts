import express, { Router } from "express";

import ReviewController from "./ReviewController";

export default class ReviewRoutes {
  private router: Router;
  private reviewController: ReviewController;

  constructor(reviewController: ReviewController) {
    this.router = express.Router();
    this.reviewController = reviewController;
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.router.post(
      "/",
      this.reviewController.createReview.bind(this.reviewController)
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
