import { Pool } from "pg";

import { Book } from "../domain/Book";
import BookRepository from "../domain/BookRepository";

class BookRepositoryImpl implements BookRepository {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  public async getAllBooks(): Promise<Book[]> {
    // Implementa la lógica para obtener todos los libros de la base de datos
    // Utiliza this.pool.query() para ejecutar consultas SQL y mapea los resultados a objetos Book
    // Retorna un array de objetos Book
    const query = "SELECT * FROM books";
    const result = await this.pool.query(query);
    const books: Book[] = result.rows.map((row: any) => {
      return new Book(row.id, row.title, row.author, row.description);
    });
    return books;
  }

  public async getBookById(id: string): Promise<Book | null> {
    // Implementa la lógica para obtener un libro por su ID de la base de datos
    // Utiliza this.pool.query() para ejecutar consultas SQL y mapea el resultado a un objeto Book
    // Retorna un objeto Book o null si no se encuentra el libro
    const query = "SELECT * FROM books WHERE id = $1";
    const values = [id];
    const result = await this.pool.query(query, values);
    if (result.rows.length === 0) {
      return null;
    }
    const row = result.rows[0];
    const book: Book = new Book(row.id, row.title, row.author, row.description);
    return book;
  }

  public async createBook(book: Book): Promise<Book> {
    // Implementa la lógica para crear un nuevo libro en la base de datos
    // Utiliza this.pool.query() para ejecutar una consulta SQL INSERT y retorna el libro creado
    const query =
      "INSERT INTO books (id, title, author, description) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [book.id, book.title, book.author, book.description];
    const result = await this.pool.query(query, values);
    const createdBook: Book = new Book(
      result.rows[0].id,
      result.rows[0].title,
      result.rows[0].author,
      result.rows[0].description
    );
    return createdBook;
  }

  public async updateBook(book: Book): Promise<Book | null> {
    // Implementa la lógica para actualizar un libro existente en la base de datos
    // Utiliza this.pool.query() para ejecutar una consulta SQL UPDATE y retorna el libro actualizado
    // Retorna null si el libro no existe en la base de datos
    const query =
      "UPDATE books SET title = $2, author = $3, description = $4 WHERE id = $1 RETURNING *";
    const values = [book.id, book.title, book.author, book.description];
    const result = await this.pool.query(query, values);
    if (result.rows.length === 0) {
      return null;
    }
    const updatedBook: Book = new Book(
      result.rows[0].id,
      result.rows[0].title,
      result.rows[0].author,
      result.rows[0].description
    );
    return updatedBook;
  }

  public async deleteBook(id: string): Promise<boolean> {
    // Implementa la lógica para eliminar un libro de la base de datos
    // Utiliza this.pool.query() para ejecutar una consulta SQL DELETE
    // Retorna true si el libro fue eliminado correctamente, o false si no se encontró el libro
    const query = "DELETE FROM books WHERE id = $1";
    const values = [id];
    await this.pool.query(query, values);
    return true;
  }
}

export default BookRepositoryImpl;
