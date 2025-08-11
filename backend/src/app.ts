import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import router from "./routes/product";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.DB_ADDRESS!);
app.use(cors());
app.use("/product", router);

app.listen(3000, () => {
  console.log("listening on port 3000");
});
