import { CatchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import userStocksModel from "../models/userStocks.model.js";

export const getStock = CatchAsyncError(async (req, res, next) => {
  try {
    const stock = await userStocksModel
      .find()
      .populate({
        path: "userId",
        select: "firstName lastName -_id",
        options: { lean: true },
      })
      .populate({
        path: "containerId",
        select: "containerName containerSize -_id",
        options: { lean: true },
      })
      .lean(); 

    const flattenedStock = stock.map((item) => ({
      ...item.userId,
      ...item.containerId,
      stockQty: item.stockQty,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    }));
    res.status(200).json(flattenedStock);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
