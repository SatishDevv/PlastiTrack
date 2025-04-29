import containerModel from "../models/container.model.js";
import { CatchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";


/* 
   *@desc    Get Container Report
   *@route   GET /api/v1/report/
*/
export const getContainerStockReport = CatchAsyncError(async (req, res, next) => {
  try {
    const containers = await containerModel.find().lean();

    if (!containers.length) {
      return next(new ErrorHandler("No containers found", 404));
    }

    const report = containers.map(container => ({
        containerId: container.containerId,
        containerName: container.containerName,
        containerSize: container.containerSize,
        inStock: container.inStock,
        inward: container.Inward || 0,
        outward: container.Outward || 0,
        remainingStock: container.remainingStock,
    }));

    res.status(200).json(report);

  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
