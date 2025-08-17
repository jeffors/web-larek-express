import {
  ErrorRequestHandler, NextFunction, Request, Response,
} from 'express';

const errorHandler: ErrorRequestHandler = (
  err,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const status = err.status || err.statusCode || 500;
  return res.status(status).send({ message: err.message });
};

export default errorHandler;
