import { Request, Response } from "express";
import product from "../models/product";

export const getProducts = async (req: Request, res: Response) => {
  return product
    .find({})
    .then((products) => res.status(200).send({ items: products, total: products.length })) // TODO: remove _id from image
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

export const createProduct = async (req: Request, res: Response) => {
  const { title, image, category, description, price } = req.body;
  return product
    .create({ title, image, category, description, price })
    .then((product) => res.status(201).send({ product }))
    .catch((err) => res.status(500).send({ message: err }));
};
