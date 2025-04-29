import { CatchAsyncError } from "../middleware/catchAsyncError.js";
import containerAssignmentModel from "../models/containerAssignment.model.js";
import transactionalModel from "../models/containerTransaction.model.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import userStocksModel from "../models/userStocks.model.js";

/**
 * {NEW}
 * @desc  Count for allot form
 * @routes http://www.localhost:3000/api/v1/count/$`{transactionId}/${userId}`
 */

export const countAssignmentStock = CatchAsyncError(async (req, res, next) => {
  try {
    const { transactionId, userId } = req.params;

    if (!transactionId || !userId) {
      return next(new ErrorHandler("All Field Required", 400));
    }

    const stockData = await transactionalModel.findById(transactionId);
    if (!stockData) {
      return next(new ErrorHandler("Transaction not found", 400));
    }

    const containerId = stockData.containerId;
    const createdById = String(stockData.createdBy);

    let finalAssignmentCount = 0;
   
    const assignmentData = await containerAssignmentModel.find({
      containerTransactionId: transactionId,
      containerId,
      createdById: userId,
      actionType: "Allot",
    });

    let totalAssignAssignmentCount = 0;
    assignmentData.forEach((item) => {
      totalAssignAssignmentCount += item.quantity;
    });
 
    const userStock = await userStocksModel.findOne({
      userId,
      containerId,
    });

    const receivedQty = userStock ? userStock.stockQty : 0;
   
    if (userId === createdById) {
      finalAssignmentCount = stockData.totalQuantity - totalAssignAssignmentCount;
    } else {
      finalAssignmentCount = receivedQty - totalAssignAssignmentCount;
    }

    finalAssignmentCount = finalAssignmentCount < 0 ? 0 : finalAssignmentCount;

    res.status(200).json(finalAssignmentCount);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
