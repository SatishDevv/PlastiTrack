import mongoose from "mongoose";
import { CatchAsyncError } from "../middleware/catchAsyncError.js";
import statusModel from "../models/status.model.js";
import ErrorHandler from "../utils/ErrorHandler.js";

//Create Status by ID
export const createStatus = CatchAsyncError(async (req, res, next) => {
  try {
    const { statusType, statusCode } = req.body;
    if (!statusType || !statusCode) {
      return next(new ErrorHandler("All fields required", 404));
    }
    const newStatus = new statusModel(req.body);
    await newStatus.save();
    res.status(200).json({ success: true, status: newStatus });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Get Status by ID
export const getStatusById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ErrorHandler("Invalid status ID", 404));
    }

    const status = await statusModel.findById(id);
    if (!status) {
      return next(new ErrorHandler("Status not found", 403));
    }

    res.status(200).json(status);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

//Get All status
export const getAllStatus = async (req, res, next) => {
  try {
    const statuses = await statusModel.find();

    res.status(200).json(statuses);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

//Update status by ID
export const updateStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { statusType, statusCode } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ErrorHandler("Invalid status ID", 404));
    }

    const updatedStatus = await statusModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json(updateStatus);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// Delete status by ID

export const deleteStatus = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ErrorHandler("Invalid status ID", 404));
    }

    const deletedStatus = await statusModel.findByIdAndDelete(id);

    res.status(200).json({ success: true, deletedStatus });
  } catch (error) {
    return next(new ErrorHandler(error.message, 404));
  }
};
