"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "title is required"],
    },
    author: {
        type: String,
        required: [true, "author is required"],
    },
    genre: {
        type: String,
        enum: {
            values: [
                "FICTION",
                "NON_FICTION",
                "SCIENCE",
                "HISTORY",
                "BIOGRAPHY",
                "FANTASY",
            ],
            message: "Genre must be one of: FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY",
        },
        required: [true, "genre is required"],
    },
    isbn: {
        type: String,
        required: [true, "isbn is required"],
        unique: [true, "isbn must be unique"],
    },
    description: {
        type: String,
    },
    copies: {
        type: Number,
        required: [true, "copies is required"],
        min: [0, "must be a non-negative number"],
    },
    available: {
        type: Boolean,
        default: true,
    },
}, { versionKey: false, timestamps: true });
// mongoose pre middleware
bookSchema.pre("find", function (next) {
    console.log(`preparing to retrieve all books`);
    next();
});
bookSchema.post("find", function (doc, next) {
    console.log(`retrieved all books ${doc}`);
    next();
});
bookSchema.pre("save", function (next) {
    console.log(`preparing to save ${this.title}`);
    next();
});
// mongoose post middleware
bookSchema.post("save", function (doc, next) {
    console.log(`${doc.title} is created`);
    next();
});
// business logic with instance methods
bookSchema.method("updateBookAfterBorrow", function updateBookAfterBorrow(quantity) {
    this.copies -= quantity;
    this.available = this.copies > 0;
    return this.save();
});
const Book = (0, mongoose_1.model)("Book", bookSchema);
exports.default = Book;
