"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("../controllers/book.controller");
const bookRoutes = express_1.default.Router();
bookRoutes.post("/", book_controller_1.createNewBook);
bookRoutes.get("/", book_controller_1.getAllBooks);
bookRoutes.get("/:bookId", book_controller_1.getBookById);
bookRoutes.patch("/:bookId", book_controller_1.updateBook);
bookRoutes.delete("/:bookId", book_controller_1.deleteBook);
exports.default = bookRoutes;
