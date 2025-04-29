import Joi, { required } from "joi";

export const containerTransactionValidations = Joi.object({
  containerId: Joi.required(),
  statusType: Joi.string().required(),
  statusTypeId: Joi.string().required(),
  quantity: Joi.number().min(1).required().messages({
    "number.min": "Quantity must be greater than 0",
  }),
});
