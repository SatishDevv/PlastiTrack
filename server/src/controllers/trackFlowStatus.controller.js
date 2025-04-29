import { CatchAsyncError } from "../middleware/catchAsyncError.js";
import containerAssignmentModel from "../models/containerAssignment.model.js";
import ErrorHandler from "../utils/ErrorHandler.js";


/**
 *   (NEW)
 *   @desc    Get transaction flow status(get all assignments according to transactionId)
 *   @route   GET /api/v1/transaction/track/transactionflow
 */
export const getTransactionFlowStatus = CatchAsyncError(
  async (req, res, next) => {
    try {
      const allTranscations = await containerAssignmentModel
        .find()
        .sort({ createdAt: -1 })
        .populate("containerTransactionId", "transactionId")
        .populate("fromUser", "firstName lastName")
        .populate("toUser", "firstName lastName")
        .populate("qrCode")
        .populate("containerId", "containerSize containerName");

      const data = allTranscations.map((txn) => ({
        _id: txn._id,
        transactionId: txn.containerTransactionId?.transactionId,
        action: `${
          [txn.fromUser?.firstName, txn.fromUser?.lastName]
            .filter(Boolean)
            .join(" ") || "Unknown"
        } → ${
          [txn.toUser?.firstName, txn.toUser?.lastName]
            .filter(Boolean)
            .join(" ") || "Unknown"
        }`,
        qrCode: txn.qrCode,
        containerType: txn.containerId?.containerSize,
        containerName: txn.containerId?.containerName,
        toUser: `${txn.toUser?.firstName} ${txn.toUser?.lastName}`,
        quantity: txn.quantity,
        status: txn.status,
        createdAt: txn.createdAt,
        actionType: txn.actionType,
      }));

      res.status(200).json(data);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
