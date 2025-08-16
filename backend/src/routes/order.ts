import { orderRouteValidator } from "../middlewares/validations";
import { createOrder } from "../controllers/order";
import express from "express";

const orderRouter = express.Router();

orderRouter.post("/", orderRouteValidator, createOrder);

export default orderRouter;
