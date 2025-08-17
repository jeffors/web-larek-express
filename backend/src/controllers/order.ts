import { faker } from '@faker-js/faker';
import { NextFunction, Request, Response } from 'express';
import productModel from '../models/product';
import BadRequestError from '../errors/bad-request-error';

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { total, items } = req.body;
    const products = await productModel.find({ _id: { $in: items } });

    const productsTotal = items.reduce((currentTotal: number, itemId: string) => {
      const product = products.find((p) => p._id.toString() === itemId);

      if (!product) {
        throw new BadRequestError('Товары в заказе не были найдены');
      }
      if (product.price === null) {
        throw new BadRequestError(
          `Товар ${product.title} на данный момент не продаётся`,
        );
      }

      return currentTotal + product.price;
    }, 0);

    if (productsTotal !== total) {
      throw new BadRequestError(
        'Указанная цена заказа не совпадает с суммой цен товаров',
      );
    }

    const orderId = faker.string.uuid();
    return res.status(200).send({ id: orderId, total: productsTotal });
  } catch (err) {
    return next(err);
  }
};

export default createOrder;
