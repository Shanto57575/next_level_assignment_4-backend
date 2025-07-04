"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const borrowSchema = new mongoose_1.Schema({
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Book",
        required: [true, "book reference is required"],
    },
    quantity: {
        type: Number,
        required: [true, "quantity is required"],
        min: [1, "Must be a positive number"],
    },
    dueDate: {
        type: Date,
        required: [true, "Due Date is required"],
    },
}, { versionKey: false, timestamps: true });
const Borrow = (0, mongoose_1.model)("Borrow", borrowSchema);
exports.default = Borrow;
