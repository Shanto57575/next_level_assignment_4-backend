import { model, Schema } from "mongoose";
import { IBorrow } from "../interfaces/borrow.interface";

const borrowSchema = new Schema<IBorrow>(
  {
    book: {
      type: Schema.Types.ObjectId,
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
  },
  { versionKey: false, timestamps: true }
);

const Borrow = model<IBorrow>("Borrow", borrowSchema);

export default Borrow;
