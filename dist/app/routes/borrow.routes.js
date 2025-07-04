"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const borrow_controller_1 = require("../controllers/borrow.controller");
const borrowRoutes = express_1.default.Router();
borrowRoutes.post("/", borrow_controller_1.borrowBook);
borrowRoutes.get("/", borrow_controller_1.borrowedBookSummary);
exports.default = borrowRoutes;
