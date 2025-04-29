import mongoose from "mongoose";
import { CatchAsyncError } from "../middleware/catchAsyncError.js";
import containerAssignmentModel from "../models/containerAssignment.model.js";
import userModel from "../models/user.model.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import userStocksModel from "../models/userStocks.model.js";
import QRCode from "qrcode";
import roleModel from "../models/role.model.js";

/**
 * @desc    create an assignment assign  (NEW)
 * @route   POST /api/v1/assignAssignment
 * @access  Private
 */
export const createContainerAssignments = CatchAsyncError(
  async (req, res, next) => {
    const {
      fromUser,
      toUser,
      uploadDocument,
      status,
      statusTypeId,
      createdById,
      createdByName,
      ETA,
      ETD,
      comments,
      transportationName,
      POC_Name,
      POC_MobileNumber,
      returnDeadlineDate,
      containerData,
    } = req.body;

    try {
      const now = new Date();
      const sharedFields = {
        fromUser,
        toUser,
        uploadDocument,
        status,
        statusTypeId,
        createdById,
        createdByName,
        ETA,
        ETD,
        comments,
        transportationName,
        POC_Name,
        POC_MobileNumber,
        actionType: "Allot",
        status: "Pending Dispatch",
        returnDeadlineDate,
        createdAt: now,
        updatedAt: now,
      };

      const finalAssignmentData = containerData.map((assign) => ({
        ...assign,
        ...sharedFields,
      }));
      let allotedData = await containerAssignmentModel.insertMany(
        finalAssignmentData
      );

      for (const assignmentData of allotedData) {
        if (!assignmentData.containerId || assignmentData.fromUser) {
          const userStock = await userStocksModel.findOne({
            containerId: assignmentData.containerId,
            userId: assignmentData.fromUser,
          });
          let availableQuantity = userStock.stockQty - assignmentData.quantity;
          await userStocksModel.findOneAndUpdate(
            {
              containerId: assignmentData.containerId,
              userId: assignmentData.fromUser,
            },
            {
              stockQty: availableQuantity,
            }
          );
        }
      }

      res.status(201).json({
        success: true,
        message: "Container assignments created successfully",
        data: finalAssignmentData,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

/**
 * @desc Dispatch Assignment
 */
export const dispatchAssignment = CatchAsyncError(async (req, res, next) => {
  try {
    const { assignmentId } = req.params;
    if (!assignmentId) {
      return next(new ErrorHandler("Container Not found", 400));
    }

    const containerAssignmentData = await containerAssignmentModel.findById({
      _id: assignmentId,
    });

    if (!containerAssignmentData) {
      return next(new ErrorHandler("Container Not found", 400));
    }

    if (
      !containerAssignmentData.containerTransactionId &&
      !containerAssignmentData.fromUser
    ) {
      return next(new ErrorHandler("Container Not found", 400));
    }

    const clonedData = containerAssignmentData.toObject();
    delete clonedData._id;
    delete clonedData.createdAt;
    delete clonedData.updatedAt;
    clonedData.actionType = "Dispatch";
    clonedData.status = "Dispatched";
    clonedData.dispatchDate = new Date();

    const newAssignment = await containerAssignmentModel.create(clonedData);

    if (
      !newAssignment.containerTransactionId &&
      !newAssignment.fromUser &&
      !newAssignment.containerId
    ) {
      return next(new ErrorHandler("Container Not found", 400));
    }

    await containerAssignmentModel.findByIdAndUpdate(
      {
        _id: assignmentId,
      },
      {
        isActive: false,
      }
    );
    /*
    let userStock = await userStocksModel.findOne({
      userId: newAssignment.fromUser,
      containerId: newAssignment.containerId,
    });

    if (!userStock) {
      userStock = new userStocksModel({
        userId: newAssignment.fromUser,
        containerId: newAssignment.containerId,
        stockQty: newAssignment.quantity,
      });
      await userStock.save();
    } else {
      userStock.stockQty -= newAssignment.quantity;
      await userStock.save();
    }
*/
    res.status(200).json({ message: "Successfully Dispatch" });
  } catch (error) {
    return next(new ErrorHandler(error));
  }
});

/**
 * @desc    Calculate the container count consumer || vendor ||  customer
 * @route   POST /api/v1/assignAssignment/:containerTransactionId/:roleName/:loginId
 * @access  Private
 */
export const assignmentCount = CatchAsyncError(async (req, res, next) => {
  const { containerId, userId } = req.params;
  try {
    if (!containerId || !userId) {
      return next(new ErrorHandler("Container Id required", 400));
    }

    const containerData = await userStocksModel.findOne({
      containerId,
      userId,
    });

    if (!containerData) {
      res.status(200).json(0);
    }

    res.status(200).json(containerData.stockQty);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

/**
 * @desc    get all User base on the role
 * @route   GET /api/v1/assignassignment/user/:userId
 * @access  Private
 */
export const getUserBaseOnRole = CatchAsyncError(async (req, res, next) => {
  const { _id } = req.params;
  console.log(_id);

  if (!_id) {
    return next(new ErrorHandler("User ID is required", 400));
  }

  try {
    const loggedInUser = await userModel.findById(_id);
    if (!loggedInUser) {
      return next(new ErrorHandler("User not found", 404));
    }

    const roleMap = {
      admin: ["consumer"],
      consumer: ["vendor", "customer"],
      vendor: ["consumer"],
      customer: ["admin"],
    };

    const targetRoles = roleMap[loggedInUser.roleName];

    if (!targetRoles) {
      return next(new ErrorHandler("No role mapping found for this role", 400));
    }

    const users = await userModel.find({ roleName: { $in: targetRoles } });

    res.status(200).json(users);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

/**
 * @desc    Get all Transactions base on the created by Id
 * @route   POST /api/v1/consumerTransaction
 * @access  Private
 */

export const getAssignment = CatchAsyncError(async (req, res, next) => {
  try {
    const { createdById } = req.params;

    if (!mongoose.Types.ObjectId.isValid(createdById)) {
      return next(new ErrorHandler("Invalid Container Transaction ID", 400));
    }

    const objectId = new mongoose.Types.ObjectId(createdById);

    const assignments = await containerAssignmentModel
      .find({ createdById: objectId })
      .select(
        "quantity remainingQuantity adminId consumerId vendorId customerId createdById status createdAt"
      )
      .populate({
        path: "containerTransactionId",
        select: "containerId quantity transactionName",
        populate: {
          path: "containerId",
          select: "containerName",
        },
      });

    if (!assignments.length) {
      return next(
        new ErrorHandler("No assignments found for this transaction", 404)
      );
    }

    const userIds = new Set();
    assignments.forEach((user) => {
      if (user.adminId) userIds.add(user.adminId.toString());
      if (user.consumerId) userIds.add(user.consumerId.toString());
      if (user.vendorId) userIds.add(user.vendorId.toString());
      if (user.customerId) userIds.add(user.customerId.toString());
      if (user.createdById) userIds.add(user.createdById.toString());
    });

    const users = await userModel
      .find({ _id: { $in: [...userIds] } })
      .select("firstName lastName");

    const userMap = {};
    users.forEach((user) => {
      userMap[user._id.toString()] = `${user.firstName} ${user.lastName} `;
    });

    const transactionFlow = assignments.map((assign) => ({
      transactionId: assign.containerTransactionId._id,
      name: assign.containerTransactionId.transactionName,
      containerName:
        assign.containerTransactionId.containerId?.containerName || "Unknown",
      containerId: assign.containerTransactionId.containerId?._id || null,

      quantity: assign.quantity ?? 0,
      remainingQuantity: assign.remainingQuantity,

      admin: assign.adminId
        ? userMap[assign.adminId.toString()] || "Unknown"
        : null,
      consumer: assign.consumerId
        ? userMap[assign.consumerId.toString()] || "Unknown"
        : null,
      vendor: assign.vendorId
        ? userMap[assign.vendorId.toString()] || "Unknown"
        : null,
      customer: assign.customerId
        ? userMap[assign.customerId.toString()] || "Unknown"
        : null,

      assignedBy: assign.createdById
        ? userMap[assign.createdById.toString()] || "Unknown"
        : "System",
      status: assign.status,
      createdAt: assign.createdAt,
    }));

    const cleanedTransactionFlow = transactionFlow.map((obj) => {
      return Object.fromEntries(
        Object.entries(obj).filter(
          ([key, value]) => value !== null && key !== "containerId"
        )
      );
    });

    res.status(200).json(cleanedTransactionFlow);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export const getAllAssignment = CatchAsyncError(async (req, res, next) => {
  try {
    logger.info("Get all assignment data");
    const assignmentData = await containerAssignmentModel
      .find()
      .sort({ createdAt: -1 }); // Sort by latest

    res.status(200).json(assignmentData);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

/**
 *   (NEW)
 *   @desc   Get all assignments alloted by user which has status: pending dispatch and actionType: allot
 *   @route  GET/api/v1/assignAssignment/allotedAssignments/:_id
 */
export const getAssignmentsAllotedByUser = CatchAsyncError(
  async (req, res, next) => {
    try {
      const { _id } = req.params;
      if (!_id) {
        return next(new ErrorHandler("User ID id required"));
      }
      const assignments = await containerAssignmentModel
        .find({
          fromUser: _id,
          actionType: "Allot",
          status: "Pending Dispatch",
          isActive: true,
          isDeleted: false,
        })
        .populate("containerTransactionId", "transactionId")
        .populate("toUser", "firstName lastName")
        .populate("containerId", "containerName")
        .lean();

      const flattenedStock = assignments.map((item) => ({
        ...item.containerId,
        ...item.containerTransactionId,
        ...item.toUser,
        _id: item._id,
        status: item.status,
        actionType: item.actionType,
        quantity: item.quantity,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      }));
      console.log(flattenedStock);

      res.status(200).json(flattenedStock);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

/**
 *   @desc    Generate QR code
 *   @route   POST assignAssignment/generateQr/:assignmnetId
 */

export const generateQrCode = CatchAsyncError(async (req, res, next) => {
  try {
    const { _id } = req.params;

    const assignment = await containerAssignmentModel
      .findById(_id)
      .populate("fromUser", "firstName lastName")
      .populate("toUser", "firstName lastName")
      .populate("containerId", "containerName containerSize")
      .populate("containerTransactionId", "transactionId");

    if (!assignment) {
      return next(new ErrorHandler("Assignment not found", 404));
    }

    const qrData = {
      fromUser:
        assignment.fromUser?.firstName && assignment.fromUser?.lastName
          ? `${assignment.fromUser.firstName} ${assignment.fromUser.lastName}`
          : "N/A",
      toUser:
        assignment.toUser?.firstName && assignment.toUser?.lastName
          ? `${assignment.toUser.firstName} ${assignment.toUser.lastName}`
          : "N/A",
      containerName: assignment.containerId?.containerName || "N/A",
      containerSize: assignment.containerId?.containerSize || "N/A",
      transactionId: assignment.containerTransactionId?.transactionId || "N/A",
      quantity: assignment.quantity || 0,
      dispatchDate:
        assignment.status === "Dispatched" && assignment.dispatchDate
          ? new Date(assignment.dispatchDate).toISOString()
          : "Pending",
    };

    const origin = process.env.ORIGIN?.split(",")[0]
      .replace(/["[\]]/g, "")
      .trim();
    const qrLink = `${origin}/api/v1/assignAssignment/generateQr/details/${_id}`;
    const qrCodeUrl = await QRCode.toDataURL(qrLink);
    assignment.qrCode = qrCodeUrl;
    await assignment.save();
    res.status(200).json({
      message: "QR Code generated successfully",
      qrCodeUrl,
      // qrLink,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

/**
 *  @desc   Get QR details in browser page
 *  @route  GET  /api/v1/assignAssignment/generateQr/details/:assignmentId
 */

export const showQrDetailsPage = CatchAsyncError(async (req, res, next) => {
  const { assignmentId } = req.params;

  const assignment = await containerAssignmentModel
    .findById(assignmentId)
    .populate("fromUser", "firstName lastName")
    .populate("toUser", "firstName lastName")
    .populate("containerId", "containerName containerSize")
    .populate("containerTransactionId", "transactionId");

  if (!assignment) {
    return next(new ErrorHandler("Assignment not found", 404));
  }

  const qrData = {
    fromUser: assignment.fromUser
      ? `${assignment.fromUser.firstName} ${assignment.fromUser.lastName}`
      : "N/A",
    toUser: assignment.toUser
      ? `${assignment.toUser.firstName} ${assignment.toUser.lastName}`
      : "N/A",
    containerName: assignment.containerId?.containerName || "N/A",
    containerSize: assignment.containerId?.containerSize || "N/A",
    transactionId: assignment.containerTransactionId?.transactionId || "N/A",
    quantity: assignment.quantity || 0,
    dispatchDate:
      assignment.status === "Dispatched" && assignment.dispatchDate
        ? new Date(assignment.dispatchDate).toLocaleString()
        : "Pending",
  };

  res.render("qrDetails", {
    title: "QR Assignment Details",
    qrData,
  });
});

/**
 * @desc    Get user list based on roleId
 * @route   /api/v1/assignAssignment/role/:_id
 */

export const getUsersByRoleId = CatchAsyncError(async (req, res, next) => {
  try {
    const { _id } = req.params;

    if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
      return next(new ErrorHandler("Invalid Role ID", 400));
    }
    const role = await roleModel.findById(_id);
    if (!role) {
      return next(new ErrorHandler("Role not found", 404));
    }
    const users = await userModel
      .find({ roleId: new mongoose.Types.ObjectId(_id) })
      .select("-password");

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found for this role." });
    }

    res.status(200).json(users);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
