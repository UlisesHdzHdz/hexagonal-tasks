import bodyParser from "body-parser";
import express, { NextFunction, Request, Response } from "express";

import BookService from "./book/application/BookService";
import BookController from "./book/infrastructure/BookController";
import BookRepositoryImpl from "./book/infrastructure/BookRepositoryImpl";
import BookRoutes from "./book/infrastructure/BookRoutes";
import { Database } from "./config/database";
import ReviewService from "./review/application/ReviewService";
import ReviewController from "./review/infrastructure/ReviewController";
import ReviewRepositoryImpl from "./review/infrastructure/ReviewRepositoryImpl";
import ReviewRoutes from "./review/infrastructure/ReviewRoutes";

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

// Crea una instancia de ResenaRepositoryImpl pasando el pool de la base de datos
const reviewRepository = new ReviewRepositoryImpl(pool);
// Crea una instancia de ResenaService pasando el resenaRepository
const reviewService = new ReviewService(reviewRepository);
// Crea una instancia de ResenaController pasando el resenaService
const reviewController = new ReviewController(reviewService);

// Rutas relacionadas con los libros
const bookRoutes = new BookRoutes(bookController);
const reviewRoutes = new ReviewRoutes(reviewController);

app.use("/books", bookRoutes.getRouter());
app.use("/reviews", reviewRoutes.getRouter());

app.get("/server1", (req: Request, res: Response) => {
  res.send("estamos en el server A ");
});

// Middleware para manejar errores
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`[APP] - Starting application on port ${PORT}`);
});
