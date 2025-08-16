import { faker } from "@faker-js/faker/locale/ru";
import { NextFunction, Request, Response } from "express";
import product from "../models/product";

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
      return res.status(400).send({
        message: "Указанный товар не найден",
      });
    }
    if (product.price === null) {
      return res.status(400).send({ message: "Указанный товар не продаётся" });
    }
    productsTotal += product.price;
  }
  if (productsTotal !== total) {
    return res
      .status(400)
      .send({ message: "Сумма заказа не совпадает с суммой цен товаров" });
  }
  const orderId = faker.string.uuid();
  return res.status(201).send({ id: orderId, total: productsTotal });
};
