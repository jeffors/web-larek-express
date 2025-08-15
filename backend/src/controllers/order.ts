import { faker } from "@faker-js/faker/locale/ru";
import { Request, Response } from "express";

export const createOrder = async (req: Request, res: Response) => {
  const { payment, email, phone, address, total, items } = req.body;
  const orderId = faker.string.uuid();
  res.status(200).send({ id: orderId, total: total });
};
