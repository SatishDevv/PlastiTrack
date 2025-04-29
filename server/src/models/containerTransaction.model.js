import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    transactionId: {
      type: String,
      unique: true,
      required: true,
    },
    createdOn: {
      type: Date,
      default: Date.now,
    },
    completedOn: {
      type: Date,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending",
    },
    containerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Container",
    },
    totalQuantity: {
      type: Number,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const transactionalModel = mongoose.model(
  "ContainerTransaction",
  transactionSchema
);
export default transactionalModel;
