import dotenv from "dotenv";
import { CatchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { logger } from "../utils/logger.js";
import roleModel from "../models/role.model.js";
import { roleValidationSchema } from "../validations/role.validations.js";

dotenv.config();

//Create role
export const createRole = CatchAsyncError(async (req, res, next) => {
  try {
    // Validate request body using Joi
    const { error } = roleValidationSchema.validate(req.body);
    if (error) {
      return next(new ErrorHandler(error.details[0].message, 400));
    }
    const { roleName } = req.body;
    const role = new roleModel({ roleName });
    const data = await role.save();
    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    logger.error(error.message);
    return next(new ErrorHandler(error.message, 400));
  }
});

//Get All roles
export const getAllRoles = CatchAsyncError(async (req, res, next) => {
  try {
    const roles = await roleModel.find();
    res.status(200).json(roles);
  } catch (error) {
    logger.error(error.message);
    return next(new ErrorHandler(error.message, 400));
  }
});

//Get role by ID
export const getRoleById = CatchAsyncError(async (req, res, next) => {
  try {
    const roles = await roleModel.findById(req.params.id);
    res.status(200).json(roles);
  } catch (error) {
    logger.error(error.message);
    return next(new ErrorHandler(error.message, 400));
  }
});

// Update role by ID
export const updateRole = CatchAsyncError(async (req, res, next) => {
  try {
    // Validate request body
    const { error } = roleValidationSchema.validate(req.body);
    if (error) {
      return next(new ErrorHandler(error.details[0].message, 400));
    }

    const updatedRole = await roleModel.findByIdAndUpdate(
      req.params.id,
      { roleName: req.body.roleName },
      { new: true, runValidators: true }
    );

    if (!updatedRole) {
      return next(new ErrorHandler("Role not found", 404));
    }

    res.status(200).json(updatedRole);
  } catch (error) {
    logger.error(error.message);
    return next(new ErrorHandler(error.message, 400));
  }
});

//Delete role by ID
export const deleteRole = CatchAsyncError(async (req, res, next) => {
  try {
    const deletedrole = await roleModel.findById(req.params.id);
    // console.log(req.params.id);

    if (!deletedrole) {
      return next(new ErrorHandler("Role not Found or id is incorrect", 404));
    }

    await roleModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Role deleted successfully.",
    });
  } catch (error) {
    logger.error(error.message);
    return next(new ErrorHandler(error.message, 400));
  }
});
