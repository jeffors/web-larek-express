import { createOrderValidator } from "../middlewares/validations";
import { createOrder } from "../controllers/order";
import express from "express";

const orderRouter = express.Router();

orderRouter.post("/", createOrderValidator, createOrder);

export default orderRouter;
