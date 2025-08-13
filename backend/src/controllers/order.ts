import { Request, Response } from "express";

export const createOrder = async (req: Request, res: Response) => {
  const { payment, email, phone, address, total, items } = req.body;
  res.status(200).send({ id: "fakeid", total: total });
};
