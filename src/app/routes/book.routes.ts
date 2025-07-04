import express from "express";
import {
  createNewBook,
  deleteBook,
  getAllBooks,
  updateBook,
} from "../controllers/book.controller";

const bookRoutes = express.Router();

bookRoutes.post("/", createNewBook);
bookRoutes.get("/", getAllBooks);
bookRoutes.patch("/:bookId", updateBook);
bookRoutes.delete("/:bookId", deleteBook);

export default bookRoutes;
