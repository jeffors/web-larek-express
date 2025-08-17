import express from 'express';
import { createOrderValidator } from '../middlewares/validations';
import createOrder from '../controllers/order';

const orderRouter = express.Router();

orderRouter.post('/', createOrderValidator, createOrder);

export default orderRouter;
