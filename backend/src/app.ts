import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import 'dotenv/config'

const app = express();
mongoose.connect(process.env.DB_ADDRESS!);
app.use(cors());
app.listen(3000, () => {
  console.log("listening on port 3000");
});
