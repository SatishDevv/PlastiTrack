import mongoose from "mongoose";
import { CatchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import containerModel from "../models/container.model.js";
import containerAssignmentModel from "../models/containerAssignment.model.js";

/* @desc   Get Container Assignment by ID
   @route  /api/v1/assignment/:id
*/
export const getContainerAssignmentById = CatchAsyncError(
  async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorHandler("Invalid Assignment ID", 400));
      }

      const assignment = await containerAssignmentModel.findById(id);

      if (!assignment) {
        return next(new ErrorHandler("Assignment not found", 404));
      }

      res.status(200).json({
        success: true,
        assignment,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

export const updateContainerAssignment = CatchAsyncError(
  async (req, res, next) => {
    try {
      const { error } = validateUpdateAssignment(req.body);
      if (error) {
        return next(new ErrorHandler(error.details[0].message, 400));
      }

      const {
        assignmentID,
        newConsumerID,
        containerAssignmentArray,
        uploadDocument,
      } = req.body;

      if (
        !assignmentID ||
        !containerAssignmentArray ||
        containerAssignmentArray.length === 0
      ) {
        return next(new ErrorHandler("Missing required fields", 400));
      }

      const existingAssignment = await containerAssignmentModel.findById(
        assignmentID
      );
      if (!existingAssignment) {
        return next(
          new ErrorHandler(`Assignment not found for ID: ${assignmentID}`, 404)
        );
      }

      let newConsumerAssignment = await containerAssignmentModel.findOne({
        consumerID: newConsumerID,
      });

      if (!newConsumerAssignment) {
        newConsumerAssignment = new containerAssignmentModel({
          consumerID: newConsumerID,
          containerAssignmentArray: [],
          uploadDocument: uploadDocument || null,
        });
      }

      for (const updatedContainer of containerAssignmentArray) {
        const { _id, ...updateFields } = updatedContainer;

        if (!_id) {
          return next(
            new ErrorHandler(
              "_id is required to update a specific container assignment",
              400
            )
          );
        }

        const existingContainer =
          existingAssignment.containerAssignmentArray.find(
            (c) => c._id.toString() === _id
          );

        if (!existingContainer) {
          return next(
            new ErrorHandler(
              `Container assignment not found for _id: ${_id}`,
              404
            )
          );
        }

        const masterContainer = await containerModel.findById(
          existingContainer.containerID
        );
        if (!masterContainer) {
          return next(new ErrorHandler("Master container not found", 404));
        }
        if (existingContainer.statusType.toLowerCase() === "outward") {
          masterContainer.Outward -= existingContainer.containerQuatity;
          masterContainer.remainingStock += existingContainer.containerQuatity;
        } else if (existingContainer.statusType.toLowerCase() === "inward") {
          masterContainer.Inward -= existingContainer.containerQuatity;
          masterContainer.remainingStock -= existingContainer.containerQuatity;
        }

        Object.assign(existingContainer, updateFields);

        const newQuantity = existingContainer.containerQuatity;
        const isOutward =
          existingContainer.statusType.toLowerCase() === "outward";
        const isInward =
          existingContainer.statusType.toLowerCase() === "inward";

        if (isOutward) {
          if (newQuantity > masterContainer.remainingStock) {
            return next(new ErrorHandler("Not enough stock available", 400));
          }
          masterContainer.Outward += newQuantity;
          masterContainer.remainingStock -= newQuantity;
        } else if (isInward) {
          masterContainer.Inward += newQuantity;
          masterContainer.remainingStock += newQuantity;
        }

        await masterContainer.save();

        existingAssignment.containerAssignmentArray =
          existingAssignment.containerAssignmentArray.filter(
            (c) => c._id.toString() !== _id
          );
        newConsumerAssignment.containerAssignmentArray.push(existingContainer);
      }

      await existingAssignment.save();
      await newConsumerAssignment.save();

      return res.status(200).json({
        success: true,
        message: "Consumer updated. Assignment moved to the new consumer.",
        oldAssignment: existingAssignment,
        newAssignment: newConsumerAssignment,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//In the below api assignment and transaction are both get deleted
export const deleteContainerAssignment = CatchAsyncError(
  async (req, res, next) => {
    try {
      const {id} = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorHandler("Invalid Assignment ID", 400));
      }

      const assignment = await containerAssignmentModel.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            isDeleted: true,
            updatedAt: new Date(),
          },
        }
      );
      if (!assignment) {
        return next(new ErrorHandler("Container assignment Not Found", 404));
      }
      res
        .status(200)
        .json({ message: "Container Assignment Deleted Successfully" });
    } catch (error) {
      console.error("Error:", error);
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
