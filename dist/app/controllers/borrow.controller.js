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
exports.borrowedBookSummary = exports.borrowBook = void 0;
const book_model_1 = __importDefault(require("../models/book.model"));
const borrow_model_1 = __importDefault(require("../models/borrow.model"));
const getError_1 = __importDefault(require("../utils/getError"));
const borrowBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { book, quantity, dueDate } = req.body;
    console.log(book, quantity, dueDate);
    try {
        // at first search the book
        const findBook = (yield book_model_1.default.findById(book, {
            available: 1,
            copies: 1,
        }));
        // if book is not available return not found message
        if (!findBook) {
            return res
                .status(404)
                .json({ success: false, message: "Book not found" });
        }
        // if available check copies is greater than quantity and
        // it must be available
        if ((findBook === null || findBook === void 0 ? void 0 : findBook.copies) >= quantity && findBook.available === true) {
            // if ok then borrow the book
            const newBook = yield borrow_model_1.default.create(req.body);
            // instance methods for business logic
            yield ((_a = findBook === null || findBook === void 0 ? void 0 : findBook.updateBookAfterBorrow) === null || _a === void 0 ? void 0 : _a.call(findBook, quantity));
            return res.status(200).json({
                success: true,
                message: "Book borrowed successfully",
                data: newBook,
            });
        }
        else {
            if ((findBook === null || findBook === void 0 ? void 0 : findBook.copies) < quantity) {
                return res.status(404).json({
                    success: false,
                    message: `${(findBook === null || findBook === void 0 ? void 0 : findBook.copies) > 0
                        ? `only ${findBook === null || findBook === void 0 ? void 0 : findBook.copies} ${(findBook === null || findBook === void 0 ? void 0 : findBook.copies) > 1 ? "books" : "book"} available`
                        : "Book is not available"}`,
                });
            }
            else if (!findBook.available) {
                return res.status(404).json({
                    success: false,
                    message: `Book is not available`,
                });
            }
        }
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
exports.borrowBook = borrowBook;
const borrowedBookSummary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // aggregation
        let bookSummary = yield borrow_model_1.default.aggregate([
            {
                $group: {
                    _id: "$book",
                    totalQuantity: { $sum: "$quantity" },
                },
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "bookSummary",
                },
            },
            { $unwind: "$bookSummary" },
            {
                $project: {
                    _id: 0,
                    book: {
                        title: "$bookSummary.title",
                        isbn: "$bookSummary.isbn",
                    },
                    totalQuantity: 1,
                },
            },
        ]);
        return res.status(200).json({
            success: true,
            message: "Book borrowed successfully",
            data: bookSummary,
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
exports.borrowedBookSummary = borrowedBookSummary;
