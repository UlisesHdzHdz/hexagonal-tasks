import bodyParser from "body-parser";
import express, { NextFunction, Request, Response } from "express";

import BookController from "./book/application/BookController";
import BookService from "./book/application/BookService";
import BookRepositoryImpl from "./book/infrastructure/BookRepositoryImpl";
import BookRoutes from "./book/infrastructure/BookRoutes";
import { Database } from "./config/database";

// Crea una instancia de la aplicación Express
const app = express();
const PORT = 3000;

// Middleware para el manejo de datos en formato JSON
app.use(bodyParser.json());

// Crea una instancia de la base de datos
const database = new Database();
const pool = database.getPool();

// Crea las instancias de los componentes necesarios
const bookRepository = new BookRepositoryImpl(pool);
const bookService = new BookService(bookRepository);
const bookController = new BookController(bookService);

// Rutas relacionadas con los libros
const bookRoutes = new BookRoutes(bookController);
app.use("/books", bookRoutes.getRouter());

// Middleware para manejar errores
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`[APP] - Starting application on port ${PORT}`);
});
