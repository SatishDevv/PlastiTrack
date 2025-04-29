import mongoose from "mongoose";

const containerAssignmentSchema = new mongoose.Schema(
  {
    containerTransactionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ContainerTransaction",
    },
    containerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Container",
    },
    fromUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    toUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    actionType: {
      type: String,
    },
    uploadDocument: {
      type: String,
    },
    status: {
      type: String,
    },
    statusTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: 1,
    },
    isDeleted: {
      type: Boolean,
      default: 0,
    },
    createdById: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
    createdByName: {
      type: String,
    },
    quantity: {
      type: Number,
    },
    ETA: {
      type: Date,
    },
    ETD: {
      type: Date,
    },
    comments: {
      type: String,
    },
    modeOfTransport: {
      type: String,
    },
    transportationName: {
      type: String,
    },
    vehicleNumber: {
      type: String,
    },
    POC_Name: {
      type: String,
    },
    POC_MobileNumber: {
      type: String,
    },
    returnDeadlineDate: {
      type: String,
    },
    containerImages: {
      type: String,
    },
    isAccept: {
      type: Boolean,
      default: false,
    },
    qrCode: {
      type: String,
    },
    dispatchDate: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const containerAssignmentModel = mongoose.model(
  "containerAssignment",
  containerAssignmentSchema
);

export default containerAssignmentModel;
