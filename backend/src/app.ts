import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import productRouter from "./routes/product";
import orderRouter from "./routes/order";
import path from "path";
import { errors } from "celebrate";
import errorHandler from "./middlewares/error-handler";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(process.env.DB_ADDRESS!);
app.use(cors());
app.use("/product", productRouter);
app.use("/order", orderRouter);
app.use(express.static(path.join(__dirname, "../public")));
app.use(errors());
app.use(errorHandler);
app.listen(3000, () => {
  console.log("listening on port 3000");
});
