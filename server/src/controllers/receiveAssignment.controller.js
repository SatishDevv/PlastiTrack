import { CatchAsyncError } from "../middleware/catchAsyncError.js";
import containerAssignmentModel from "../models/containerAssignment.model.js";
import userModel from "../models/user.model.js";
import userStocksModel from "../models/userStocks.model.js";
import ErrorHandler from "../utils/ErrorHandler.js";

/**
 *   @desc    Get all assignment assigned to user based on user ID
 *   @route   GET /api/v1/recevieAssignment/:_id
 */

export const getAllAssignmentDisptachToUser = CatchAsyncError(
  async (req, res, next) => {
    try {
      const { _id } = req.params;
      if (!_id) {
        return next(new ErrorHandler("User ID is required"));
      }

      const loggedInUser = await userModel.findById(_id);
      if (!loggedInUser) {
        return next(new ErrorHandler("User not found", 404));
      }

      const assignments = await containerAssignmentModel
        .find({
          toUser: _id,
          actionType: "Dispatch",
          status: "Dispatched",
          isActive:true
        })
        .populate("containerId", "containerName containerSize")
        .populate("fromUser", "firstName lastName roleName")
        .populate("containerTransactionId", "transactionId")
        .lean();

      // const formattedAssignments = assignments.map((assignment) => ({
      //   id: assignment._id,
      //   container: {
      //     id: assignment.containerId?._id,
      //     name: assignment.containerId?.containerName,
      //     size: assignment.containerId?.containerSize,
      //   },
      //   fromUser: {
      //     id: assignment.fromUser?._id,
      //     name: `${assignment.fromUser?.firstName} ${assignment.fromUser?.lastName}`,
      //     role: assignment.fromUser?.roleName,
      //   },
      //   transactionId: assignment.containerTransactionId?.transactionId,
      //   status: assignment.status,
      //   actionType: assignment.actionType,
      //   createdAt: assignment.createdAt,
      //   updatedAt: assignment.updatedAt,
      // }));
      const flattenedStock = assignments.map((item) => ({
        ...item.containerId,
        ...item.containerTransactionId,
        ...item.fromUser,
        _id: item._id,
        status: item.status,
        actionType: item.actionType,
        quantity: item.quantity,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      }));

      res.status(200).json(
        flattenedStock // Send the transformed data
      );

      // res.status(200).json(assignments);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

/**
 *   @desc   Receive the assignmnet and create an record
 *   @route  POST  /api/v1/receiveAssignment/assignment/:assignmentId
 */

export const receiveAssignment = CatchAsyncError(async (req, res, next) => {
  try {
    const { assignmentId } = req.params;

    if (!assignmentId) {
      return next(new ErrorHandler("Assignment ID is required", 400));
    }
   
    const assignment = await containerAssignmentModel
      .findById(assignmentId)
      .populate("toUser", "firstName");
    if (!assignment || !assignment.isActive) {
      return next(new ErrorHandler("Active assignment not found", 404));
    }

    const receiver = assignment.toUser;
    const receiverId = receiver._id;
    const receiverName = receiver.firstName; 

    const clonedData = assignment.toObject();
    delete clonedData._id;
    delete clonedData.createdAt;
    delete clonedData.updatedAt;

    clonedData.actionType = null;
    clonedData.status = "Received";
    clonedData.toUser = null;
    clonedData.fromUser = receiverId;
    clonedData.createdById = receiverId;
    clonedData.createdByName = receiverName; 
    clonedData.isActive = true;

    const newAssignment = await containerAssignmentModel.create(clonedData);
   
    await containerAssignmentModel.findByIdAndUpdate(assignmentId, {
      isActive: false,
    });
  
    let userStock = await userStocksModel.findOne({
      userId: receiverId,
      containerId: newAssignment.containerId,
    });

    if (!userStock) {
      userStock = new userStocksModel({
        userId: receiverId,
        containerId: newAssignment.containerId,
        stockQty: newAssignment.quantity,
      });
    } else {
      userStock.stockQty += newAssignment.quantity;
    }

    await userStock.save();

    res.status(200).json({
      message: "Successfully Received"
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
