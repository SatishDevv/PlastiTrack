import Joi from "joi";

const containerSchema = Joi.object({
  containerTransactionId: Joi.string().required(),
  containerId: Joi.string().required(),
  quantity: Joi.number().greater(0).required(),
});

export const containerAssignmentSchema = Joi.object({
  fromUser: Joi.string().required(),
  toUser: Joi.string().required(),
  uploadDocument: Joi.string().allow(null, ""),
  status: Joi.string(),
  statusTypeId: Joi.string(),
  createdById: Joi.string().required(),
  createdByName: Joi.string().required(),
  ETA: Joi.date().optional(),
  ETD: Joi.date().optional(),
  comments: Joi.string().allow(null, ""),
  transportationName: Joi.string().allow(null, ""),
  POC_Name: Joi.string().allow(null, ""),
  POC_MobileNumber: Joi.string().allow(null, ""),
  returnDeadlineDate:    Joi.date().optional(),
  containerData: Joi.array().items(containerSchema).min(1).required(),
});
