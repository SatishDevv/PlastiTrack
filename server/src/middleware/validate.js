import ErrorHandler from "../utils/ErrorHandler.js";

const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const messages = error.details.map((e) => e.message).join(", ");
    return next(new ErrorHandler(messages, 400));
  }

  req.body = value;
  next();
};

export default validate;
