import { Request, Response } from "express";

import BookService from "../application/BookService";
import { Book } from "../domain/Book";

class BookController {
  private bookService: BookService;

  constructor(bookService: BookService) {
    this.bookService = bookService;
  }

  public getAllBooks = async (req: Request, res: Response): Promise<void> => {
    try {
      const books: Book[] = await this.bookService.getAllBooks();
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  public getBookById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const book: Book | null = await this.bookService.getBookById(id);
      if (book) {
        res.status(200).json(book);
      } else {
        res.status(404).json({ message: "Book not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  public createBook = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id, title, author, description } = req.body;
      const book: Book = new Book(id, title, author, description);
      const createdBook: Book = await this.bookService.createBook(book);
      res.status(201).json(createdBook);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  public updateBook = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { title, author, description } = req.body;
      const book: Book = new Book(id, title, author, description);
      const updatedBook: Book | null = await this.bookService.updateBook(book);
      if (updatedBook) {
        res.status(200).json(updatedBook);
      } else {
        res.status(404).json({ message: "Book not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  public deleteBook = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const success: boolean = await this.bookService.deleteBook(id);
      if (success) {
        res.status(200).json({ message: "Book deleted" });
      } else {
        res.status(404).json({ message: "Book not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}

export default BookController;
