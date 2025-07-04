import { Request, Response } from "express";
import Book from "../models/book.model";
import Borrow from "../models/borrow.model";
import getErrorMessage from "../utils/getError";
import { BookMethod, IBook } from "../interfaces/book.interface";

const borrowBook = async (req: Request, res: Response) => {
  const { book, quantity, dueDate } = req.body;
  console.log(book, quantity, dueDate);

  try {
    // at first search the book
    const findBook = (await Book.findById(book, {
      available: 1,
      copies: 1,
    })) as IBook & BookMethod;

    // if book is not available return not found message
    if (!findBook) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    }

    // if available check copies is greater than quantity and
    // it must be available
    if (findBook?.copies >= quantity && findBook.available === true) {
      // if ok then borrow the book
      const newBook = await Borrow.create(req.body);

      // instance methods for business logic
      await findBook?.updateBookAfterBorrow?.(quantity);

      return res.status(200).json({
        success: true,
        message: "Book borrowed successfully",
        data: newBook,
      });
    } else {
      if (findBook?.copies < quantity) {
        return res.status(404).json({
          success: false,
          message: `${
            findBook?.copies > 0
              ? `only ${findBook?.copies} ${
                  findBook?.copies > 1 ? "books" : "book"
                } available`
              : "Book is not available"
          }`,
        });
      } else if (!findBook.available) {
        return res.status(404).json({
          success: false,
          message: `Book is not available`,
        });
      }
    }
  } catch (error) {
    console.log("Error while creating book =>", error);

    if (error instanceof Error) {
      return res.status(500).json({
        message: getErrorMessage(error),
        success: false,
        error,
      });
    } else {
      return res.status(500).json({
        message: "Unknown error occurred",
        success: false,
      });
    }
  }
};

const borrowedBookSummary = async (req: Request, res: Response) => {
  try {
    // aggregation
    let bookSummary = await Borrow.aggregate([
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
      {
        $sort: { totalQuantity: -1 },
      },
    ]);
    return res.status(200).json({
      success: true,
      message: "Book borrowed successfully",
      data: bookSummary,
    });
  } catch (error) {
    console.log("Error while creating book =>", error);

    if (error instanceof Error) {
      return res.status(500).json({
        message: getErrorMessage(error),
        success: false,
        error,
      });
    } else {
      return res.status(500).json({
        message: "Unknown error occurred",
        success: false,
      });
    }
  }
};

export { borrowBook, borrowedBookSummary };
