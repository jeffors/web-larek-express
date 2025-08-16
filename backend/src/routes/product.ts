import { createProductValidator } from "../middlewares/validations";
import { createProduct, getProducts } from "../controllers/products";
import express from "express";

const productRouter = express.Router();

productRouter.get("/", getProducts);
productRouter.post("/", createProductValidator, createProduct);

export default productRouter;
