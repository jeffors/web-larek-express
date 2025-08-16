import { celebrate, Joi, Segments } from "celebrate";

export const createOrderValidator = celebrate({
  [Segments.BODY]: Joi.object({
    payment: Joi.string().valid("card", "online").required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    total: Joi.number().required(),
    items: Joi.array()
      .items(Joi.string().hex().length(24).required())
      .min(1)
      .required(),
  }),
});
