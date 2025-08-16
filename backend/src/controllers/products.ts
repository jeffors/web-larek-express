import { NextFunction, Request, Response } from "express";
import product from "../models/product";
import ConflictError from "../errors/conflict-error";
import { MongooseError } from "mongoose";
import BadRequestError from "../errors/bad-request-error";

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return product
    .find({})
    .then((products) =>
      res.status(200).send({ items: products, total: products.length })
    )
    .catch(() => next(new Error("На сервере произошла непредвиденная ошибка")));
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, image, category, description, price } = req.body;
  return product
    .create({ title, image, category, description, price })
    .then((product) => res.status(201).send({ product }))
    .catch((err) => {
      if (err instanceof Error && err.message.includes("E11000")) {
        return next(
          new ConflictError(`Товар с таким названием уже существует`)
        );
      }
      if (err instanceof MongooseError && err.name === "ValidationError") {
        return next(new BadRequestError(err.message));
      }
    });
};
