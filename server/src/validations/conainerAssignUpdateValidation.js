import Joi from "joi";

export const containerUpdateValidation = (data) => {
  const schema = Joi.object({
    assignmentID: Joi.string(),
    consumerID: Joi.string(),
    containerName: Joi.string(),
    containerSize: Joi.string(),
    containerQuatity: Joi.number().integer().positive(),
    statusID: Joi.string(),
    statusType: Joi.string().valid("Inward", "Outward"),
  });

  return schema.validate(data);
};
