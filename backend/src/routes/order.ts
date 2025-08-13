import { createOrder } from "../controllers/order";
import express from "express";

const orderRouter = express.Router();

orderRouter.post("/", createOrder);

export default orderRouter;
