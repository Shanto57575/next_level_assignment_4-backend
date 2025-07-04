import express, { Request, Response } from "express";
import bookRoutes from "./app/routes/book.routes";
import borrowRoutes from "./app/routes/borrow.routes";
import cors, { CorsOptions } from "cors";

const corsOptions: CorsOptions = {
  origin: [
    "http://localhost:5173",
    "https://next-level-assignment-4-frontend.vercel.app",
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
  res.json({ message: "Library management api is running fine" });
});

app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);

export default app;
