import { CatchAsyncError } from "../middleware/catchAsyncError.js";
import containerAssignmentModel from "../models/containerAssignment.model.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { logger } from "../utils/logger.js";

//Create role
export const dataList = CatchAsyncError(async (req, res, next) => {
  const {id,roleName} = req.params;
  try {
    let query = { isAccept: false };

    switch (roleName) {
      case "admin":
        query.adminId = id;

        break;
      case "consumer":
        query.consumerId = id;
        break;
      case "vendor":
        query.vendorId = id;
        break;
      case "customer":
        query.customerId = id;
        break;
      default:
        return next(new ErrorHandler("Role Not found ", 400));
    }
    console.log(query);
    const assignmentData = await containerAssignmentModel.find(query);
    res.status(200).json(assignmentData);
  } catch (error) {
    logger.error(error.message);
    return next(new ErrorHandler(error.message, 400));
  }
});
