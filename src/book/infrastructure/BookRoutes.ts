import { Router } from "express";

import BookController from "../application/BookController";

class BookRoutes {
  private router: Router;
  private bookController: BookController;

  constructor(bookController: BookController) {
    this.router = Router();
    this.bookController = bookController;
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.router.get(
      "/",
      this.bookController.getAllBooks.bind(this.bookController)
    );
    this.router.get(
      "/:id",
      this.bookController.getBookById.bind(this.bookController)
    );
    this.router.post(
      "/",
      this.bookController.createBook.bind(this.bookController)
    );
    this.router.put(
      "/:id",
      this.bookController.updateBook.bind(this.bookController)
    );
    this.router.delete(
      "/:id",
      this.bookController.deleteBook.bind(this.bookController)
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default BookRoutes;
