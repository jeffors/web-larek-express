import { isCelebrateError } from 'celebrate';
import {
  ErrorRequestHandler, NextFunction, Request, Response,
} from 'express';

const errorHandler: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const status = err.status || err.statusCode || 500;
  return res.status(status).send({ message: err.message });
};

export default errorHandler;
