import Joi from "joi";

export const roleValidationSchema = Joi.object({
  _id: Joi.string(),
  roleName: Joi.string().trim().min(2).max(50).required().messages({
    "string.base": "Role name must be string.",
    "string.empty": "Role name cannot be empty.",
    "string.min": "Role must be at least 2 characters long.",
    "string.max": "Role name must not be exceed 50 characters.",
    "any.required": "role name is required.",
  }),
});
