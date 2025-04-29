import mongoose from "mongoose";

const containerSchema = new mongoose.Schema(
  {
    containerId: { type: String },
    adminName: { type: String, },
    containerName: { type: String, required: true },
    containerSize: { type: String },
    inStock: { type: Number },
    Outward: { type: Number, default: 0 },
    Inward: { type: Number, default: 0 }, 
    remainingStock: { type: Number, default: function () { return this.inStock; } }, 
    qrCode: { type: String },
  },
  {
    timestamps: true,
  }
);

const containerModel = mongoose.model("Container", containerSchema);

export default containerModel;

