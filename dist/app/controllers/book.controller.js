"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.getBookById = exports.getAllBooks = exports.createNewBook = void 0;
const book_model_1 = __importDefault(require("../models/book.model"));
const getError_1 = __importDefault(require("../utils/getError"));
const createNewBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookData = req.body;
    try {
        const newBook = yield book_model_1.default.create(bookData);
        return res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: newBook,
        });
    }
    catch (error) {
        console.log("Error while creating book =>", error);
        if (error instanceof Error) {
            return res.status(500).json({
                message: (0, getError_1.default)(error),
                success: false,
                error,
            });
        }
        else {
            return res.status(500).json({
                message: "Unknown error occurred",
                success: false,
            });
        }
    }
});
exports.createNewBook = createNewBook;
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { filter, sortBy, sort, limit = 10 } = req.query;
    try {
        const query = {};
        // filtering
        if (filter) {
            query.genre = filter;
        }
        let bookQuery = book_model_1.default.find(query);
        if (sortBy && sort) {
            bookQuery = bookQuery.sort({
                [sortBy]: sort === "asc" ? 1 : -1,
            });
        }
        const allBooks = yield bookQuery.limit(Number(limit));
        return res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: allBooks,
        });
    }
    catch (error) {
        console.log("Error while retrieving all books =>", error);
        if (error instanceof Error) {
            return res.status(500).json({
                message: (0, getError_1.default)(error),
                success: false,
                error,
            });
        }
        else {
            return res.status(500).json({
                message: "Unknown error occurred",
                success: false,
            });
        }
    }
});
exports.getAllBooks = getAllBooks;
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    try {
        const book = yield book_model_1.default.findById(bookId);
        return res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
            data: book,
        });
    }
    catch (error) {
        console.log("Error while retrieving book =>", error);
        if (error instanceof Error) {
            return res.status(500).json({
                message: (0, getError_1.default)(error),
                success: false,
                error,
            });
        }
        else {
            return res.status(500).json({
                message: "Unknown error occurred",
                success: false,
            });
        }
    }
});
exports.getBookById = getBookById;
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    const updateData = req.body;
    try {
        const book = yield book_model_1.default.findByIdAndUpdate(bookId, updateData, {
            new: true,
            runValidators: true,
        });
        return res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: book,
        });
    }
    catch (error) {
        console.log("Error while updating book =>", error);
        if (error instanceof Error) {
            return res.status(500).json({
                message: (0, getError_1.default)(error),
                success: false,
                error,
            });
        }
        else {
            return res.status(500).json({
                message: "Unknown error occurred",
                success: false,
            });
        }
    }
});
exports.updateBook = updateBook;
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    try {
        yield book_model_1.default.findByIdAndDelete(bookId);
        return res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: null,
        });
    }
    catch (error) {
        console.log("Error while deleting book =>", error);
        if (error instanceof Error) {
            return res.status(500).json({
                message: (0, getError_1.default)(error),
                success: false,
                error,
            });
        }
        else {
            return res.status(500).json({
                message: "Unknown error occurred",
                success: false,
            });
        }
    }
});
exports.deleteBook = deleteBook;
