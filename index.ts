import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { connectDb } from "./src/config/connect";
import cookieParser from "cookie-parser";
import authRouter from "./src/routes/userAuth";
import blogRouter from "./src/routes/blogRouter";
import { errorHandler } from "./middleware";
import cors from "cors";
// import { errorHandler } from "../middleware";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT;

app.use(cookieParser());
app.use(express.json());
app.use(cors())

app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use("/api/v1", blogRouter);
app.use(errorHandler);
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
  connectDb();
});
