import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .max(32)
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,32}$"
      )
    )
    .required(),
});

export const activateUserSchema = Joi.object({
  activation_code: Joi.string().min(4).max(4).required().messages({
    "string.empty": "Activation code is required",
  }),
  activation_token: Joi.string().required().messages({
    "string.empty": "Activation Token is required",
  }),
});

// User Login validation schema
export const loginUserSchema = Joi.object({
  email: Joi.string().email(),
  password: Joi.string().required(),
});

// List of user Validation schema 
export const createUserSchemaValidations = (data) => {
  const schema = Joi.array()
    .items(
      Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        contactNo: Joi.string().pattern(new RegExp("^[0-9]{10,15}$")).messages({
          "string.pattern.base":
            "Phone number must contain only digits and be between 10 to 15 characters long",
        }),
        email: Joi.string().email().required(),
        roleId: Joi.string().required(),
        roleName: Joi.string().required(),
        password: Joi.string().min(6),
        consumerId:Joi.string(),
      })
    )
    .min(1)
    .required();

  return schema.validate(data);
};
