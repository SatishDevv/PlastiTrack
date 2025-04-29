import Joi from "joi";

export const containerAssignmentValidations = (data) => {
  const schema = Joi.object({
    consumerID: Joi.string().required(),
    uploadDocument: Joi.string(),
   // POD: Joi.string().required(),
    containerAssignmentArray: Joi.array()
      .items(
        Joi.object({
          containerID: Joi.string().required(),
          statusID: Joi.string().required(),
          statusType: Joi.string().required(),
          containerName: Joi.string().required(),
          containerSize: Joi.string().required(),
          containerQuatity: Joi.number()
            .integer()
            .min(1)
            .required(), // Ensure at least 1 container is assigned
        }),
   
      )
      .min(1)
      .required(),
     
  });

  return schema.validate(data);
};

