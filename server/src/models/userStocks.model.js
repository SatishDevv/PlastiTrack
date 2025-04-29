import mongoose from "mongoose";

const userStocksSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      type: String,
    },
    containerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Container",
      type: String,
    },
    stockQty: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const userStocksModel = mongoose.model("UserStocks", userStocksSchema);

export default userStocksModel;
