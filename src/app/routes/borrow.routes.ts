import express from "express";
import {
  borrowBook,
  borrowedBookSummary,
} from "../controllers/borrow.controller";

const borrowRoutes = express.Router();

borrowRoutes.post("/", borrowBook);
borrowRoutes.get("/", borrowedBookSummary);

export default borrowRoutes;
