import { Book } from "../domain/Book";

interface BookRepository {
  getAllBooks(): Promise<Book[]>;
  getBookById(id: string): Promise<Book | null>;
  createBook(book: Book): Promise<Book>;
  updateBook(book: Book): Promise<Book | null>;
  deleteBook(id: string): Promise<boolean>;
}

export default BookRepository;
