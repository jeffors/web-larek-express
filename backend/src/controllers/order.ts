import { faker } from "@faker-js/faker/locale/ru";
import { NextFunction, Request, Response } from "express";
import product from "models/product";

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { total, items } = req.body;
  const products = await product.find({ _id: { $in: items } });

  if (products.length !== items.length) {
    return res.status(400).send({ message: "Указанные товары не найдены" });
  }
  for (const product of products) {
    if (product.price === null) {
      return res.status(400).send({ message: "Указанный товар не продаётся" });
    }
  }
  const productsTotal = products.reduce(
    (sum, product) => sum + product.price,
    0
  );
  if (productsTotal !== total) {
    return res
      .status(400)
      .send({ message: "Сумма заказа не совпадает с суммой цен товаров" });
  }
  const orderId = faker.string.uuid();
  return res.status(200).send({ id: orderId, total: total });
};
