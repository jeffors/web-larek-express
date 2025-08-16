import { faker } from "@faker-js/faker/locale/ru";
import { NextFunction, Request, Response } from "express";
import product from "../models/product";
import BadRequestError from "../errors/bad-request-error";

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { total, items } = req.body;
  const products = await product.find({ _id: { $in: items } });

  let productsTotal = 0;
  for (const item of items) {
    const product = products.find((p) => p._id.toString() === item);
    if (!product) {
      return next(new BadRequestError("Товары в заказе не были найдены"));
    }
    if (product.price === null) {
      return next(
        new BadRequestError(
          `Товар ${product.title} на данный момент не продаётся`
        )
      );
    }
    productsTotal += product.price;
  }
  if (productsTotal !== total) {
    return next(
      new BadRequestError(
        "Указанная цена заказа не совпадает с суммой цен товаров"
      )
    );
  }
  const orderId = faker.string.uuid();
  return res.status(200).send({ id: orderId, total: productsTotal });
};
