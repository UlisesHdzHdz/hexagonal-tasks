import { Book } from "../domain/Book";
import BookRepository from "../domain/BookRepository";

class BookService {
  private bookRepository: BookRepository;

  constructor(bookRepository: BookRepository) {
    this.bookRepository = bookRepository;
  }

  public async getAllBooks(): Promise<Book[]> {
    return this.bookRepository.getAllBooks();
  }

  public async getBookById(id: string): Promise<Book | null> {
    return this.bookRepository.getBookById(id);
  }

  public async createBook(book: Book): Promise<Book> {
    return this.bookRepository.createBook(book);
  }

  public async updateBook(book: Book): Promise<Book | null> {
    return this.bookRepository.updateBook(book);
  }

  public async deleteBook(id: string): Promise<boolean> {
    return this.bookRepository.deleteBook(id);
  }
}

export default BookService;
