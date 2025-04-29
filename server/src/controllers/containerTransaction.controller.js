import mongoose from "mongoose";
import transactionalModel from "../models/containerTransaction.model.js";
import { CatchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import containerAssignmentModel from "../models/containerAssignment.model.js";
import userStocksModel from "../models/userStocks.model.js";

//create container transaction
const padNumber = (num, size = 3) => String(num).padStart(size, "0");

export const createContainerTransaction = CatchAsyncError(
  async (req, res, next) => {
    try {
      const transactions = req.body;
      if (!Array.isArray(transactions) || transactions.length === 0) {
        return next(new ErrorHandler("No transactions provided", 400));
      }

      for (let trans of transactions) {
        if (
          !("containerId" in trans) ||
          !("totalQuantity" in trans) ||
          !("createdBy" in trans)
        ) {
          return next(new ErrorHandler("All fields are required", 400));
        }

        if (trans.totalQuantity <= 0) {
          return next(
            new ErrorHandler("totalQuantity must be greater than 0", 400)
          );
        }
        let query = { containerId: trans.containerId, userId: trans.createdBy };
        const container = await userStocksModel.findOne(query);
        if (!container) {
          return next(
            new ErrorHandler(`Container not found: ${trans.containerId}`, 404)
          );
        }

        if (container.remainingStock < trans.totalQuantity) {
          return next(
            new ErrorHandler(
              `Insufficient stock for container: ${trans.containerId}`,
              400
            )
          );
        }
      }

      const last = await transactionalModel
        .findOne()
        .sort({ _id: -1 })
        .select("transactionId");
      let lastNumber = last?.transactionId
        ? parseInt(last.transactionId.replace("TXN", ""), 10) || 0
        : 0;

      const savedTransactions = [];

      for (let i = 0; i < transactions.length; i++) {
        const { containerId, totalQuantity, createdBy } = transactions[i];
        const transactionId = `TXN${padNumber(lastNumber + i + 1)}`;

        // const container = await userStocksModel.findOne({
        //   containerId,
        //   createdBy,
        // });
        // container.remainingStock -= totalQuantity;
        // container.Outward = (container.Outward || 0) + totalQuantity;
        // await container.save();

        const transaction = new transactionalModel({
          transactionId,
          containerId,
          totalQuantity,
          createdBy,
          status: "Pending",
          completedOn: null,
        });

        const saved = await transaction.save();
        savedTransactions.push(saved);
      }

      return res.status(200).json({
        message: "Transactions created successfully",
        data: savedTransactions,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

/**
 * @description get All Transaction the transaction only if it is not associated with any assignment.
 * @routes http://localhost:3000/api/v1/transaction/getAll
 * @access Private
 */
export const getAllTransaction = CatchAsyncError(async (req, res, next) => {
  try {
    const transactions = await transactionalModel
      .find({ isDeleted: false })
      .populate(
        "containerId",
        "containerId adminName containerName containerSize inStock"
      );

    const updatedTransactions = [];

    for (const trans of transactions) {
      const assignment = await containerAssignmentModel.findOne({
        containerTransactionId: trans._id,
      });

      updatedTransactions.push({
        ...trans.toObject(),
        isAssigned: !!assignment, // true if assignment exists, false otherwise
      });
    }

    res.status(200).json(updatedTransactions);
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

/**
 * @description Get Transaction By Id the transaction only if it is not associated with any assignment.
 * @routes http://localhost:3000/api/v1/transaction/`${id}`
 * @access Private
 */
export const getTransactionById = CatchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ErrorHandler("Transaction Not found.", 404));
    }
    const transaction = await transactionalModel
      .findById(id)
      .populate(
        "containerId",
        "containerId adminName containerName containerSize inStock"
      );
    res.status(200).json({ success: true, transaction });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

/**
 * @description Update Transaction By Id the transaction only if it is not associated with any assignment.
 * @routes http://localhost:3000/api/v1/transaction/`${id}`
 * @access Private
 */
export const updateTransactionById = CatchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;

    const findTransaction = await transactionalModel.findById(id);

    if (!findTransaction) {
      return next(new ErrorHandler("Transaction Not Found", 400));
    }

    const checkAllotAssignment = await containerAssignmentModel.find({
      containerTransactionId: id,
    });

    if (checkAllotAssignment.length !== 0) {
      return next(
        new ErrorHandler(
          "You Can't Update This transaction is already assigned",
          400
        )
      );
    }

    const { totalQuantity } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ErrorHandler("Invalid Id or Id not found", 404));
    }

    const updatedTransaction = await transactionalModel.findByIdAndUpdate(
      id,
      {
        totalQuantity: totalQuantity,
      },
      { new: true }
    );
    res.status(200).json({ success: true, updatedTransaction });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

/**
 * @description Delete the transaction only if it is not associated with any assignment.
 * @routes http://localhost:3000/api/v1/transaction/`${id}`
 * @access Private
 */
export const deleteTransactionById = CatchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ErrorHandler("Transaction Id not found", 404));
    }

    const checkAllotAssignment = await containerAssignmentModel.find({
      containerTransactionId: id,
    });

    if (checkAllotAssignment.length !== 0) {
      return next(
        new ErrorHandler(
          "This transaction is already assigned you Can't delete",
          400
        )
      );
    }

    const deletedTransaction = await transactionalModel.findByIdAndUpdate(
      id,
      {
        $set: {
          isDeleted: true,
          updatedAt: new Date(),
        },
      },
      {
        new: true,
      }
    );

    if (!deletedTransaction) {
      return next(new ErrorHandler("Transaction Not Found", 404));
    }
    res.status(200).json({
      success: true,
      message: "Transaction deleted Successfully",
      deletedTransaction,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

/**
 *   (NEW)
 *   @desc    Get transaction flow status(get all assignments according to transactionId)
 *   @route   GET /api/v1/transaction/track/transactionflow
 */
export const getTransactionFlowStatus = CatchAsyncError(
  async (req, res, next) => {
    const {id} = req.params;
    try {
      const containerAssignments = await containerAssignmentModel
        .find({fromUser:id, isDeleted:false})
        .sort({ createdAt: -1 })
        .populate("containerTransactionId", "transactionId")
        .populate("fromUser", "firstName lastName")
        .populate("toUser", "firstName lastName")
        .populate("qrCode")
        .populate("containerId", "containerSize containerName");

      const data = containerAssignments.map((txn) => ({
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

/**
 * @desc Get Count Available container For transaction.
 * @routes localhost:3000/api/v1/transaction/count/`${containerId}`
 * @access
 */

export const getContainerCountForTransaction = CatchAsyncError(
  async (req, res, next) => {
    try {
      const { containerId } = req.params;

      if (!containerId) {
        return next(new ErrorHandler("Container Id required ", 400));
      }

      const userCount = await userStocksModel.findOne({ containerId });
      if (!userCount) {
        return next(new ErrorHandler("Container Stock Not Available", 400));
      }
      console.log(userCount);

      const findTransactions = await transactionalModel.find({
        containerId: containerId,
        isDeleted: false,
      });

      let assignAssignmentCount = 0;
      for (const transaction of findTransactions) {
        let assignmentData = await containerAssignmentModel.findOne({
          containerTransactionId: transaction._id,
        });
        if (!assignmentData) {
          assignAssignmentCount += transaction.totalQuantity;
        }
      }

      let finalContainerCount = userCount.stockQty - assignAssignmentCount;

      res.status(200).json(finalContainerCount);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
