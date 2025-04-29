import mongoose from "mongoose";
import { CatchAsyncError } from "../middleware/catchAsyncError.js";
import containerModel from "../models/container.model.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import QRCode from "qrcode";
import userStocksModel from "../models/userStocks.model.js";

const BASE_URL = "http://localhost:3000/api/v1/container/qr"; // Replace with your frontend domain

export const createContainer = CatchAsyncError(async (req, res, next) => {
  try {
    let { containerName, containerSize, inStock, adminName, userId } = req.body;

    if (
      !containerName ||
      !containerSize ||
      inStock === undefined ||
      !adminName ||
      !userId
    ) {
      return next(new ErrorHandler("All fields are required", 400));
    }

    containerName = containerName.trim().toLowerCase();

    // Check if container with same name and size exists
    const existingContainer = await containerModel.findOne({
      containerName,
      containerSize,
    });
    if (existingContainer) {
      return next(
        new ErrorHandler(
          "Container with the same name and size already exists",
          400
        )
      );
    }

    // Fetch latest containerId
    const lastContainer = await containerModel
      .findOne({})
      .sort({ createdAt: -1 })
      .select("containerId");

    let nextIdNumber = 1;
    if (lastContainer?.containerId) {
      const match = lastContainer.containerId.match(/container_(\d+)/);
      if (match) {
        nextIdNumber = parseInt(match[1]) + 1;
      }
    }

    const newContainerId = `container_${String(nextIdNumber).padStart(3, "0")}`;

    const newContainer = new containerModel({
      containerId: newContainerId,
      containerName,
      containerSize,
      inStock,
      adminName,
    });

    const savedContainer = await newContainer.save();

    let userStock = await userStocksModel.findOne({
      containerId: savedContainer._id,
    });

    if (!userStock) {
      userStock = new userStocksModel({
        userId: userId,
        containerId: savedContainer._id,
        stockQty: savedContainer.inStock,
      });
      await userStock.save();
    } else {
      userStock.stockQty += savedContainer.inStock;
      await userStock.save();
    }

    console.log(savedContainer);

    const containerUrl = `${BASE_URL}/${savedContainer._id}`;
    const qrCodeUrl = await QRCode.toDataURL(containerUrl);

    savedContainer.qrCode = qrCodeUrl;
    await savedContainer.save();

    res.status(201).json({ success: true, data: savedContainer });
  } catch (error) {
    if (error.code === 11000) {
      return next(
        new ErrorHandler(
          "Container with the same name and size already exists",
          400
        )
      );
    }
    return next(new ErrorHandler(error.message, 500));
  }
});

export const getContainerByIdForUpdate = CatchAsyncError(
  async (req, res, next) => {
    try {
      const { id } = req.params;
      console.log(id);

      const container = await containerModel.findOne({ _id: id });
      console.log(container);

      if (!container) {
        return next(new ErrorHandler("Container not found", 404));
      }

      // Render EJS template and pass the container data
      res.render("containerDetails", { container });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//Get all container
export const getAllContainer = CatchAsyncError(async (req, res, next) => {
  try {
    const container = await containerModel.find();
    res.status(200).json(container);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

//Get container by ID
export const getContainerbyId = CatchAsyncError(async (req, res, next) => {
  try {
    const container = await containerModel.findById(req.params.id);
    res.status(200).json(container);
  } catch (error) {
    logger.error(error.message);
    return next(new ErrorHandler(error.message, 400));
  }
});

//Update container by id
export const updateContainer = CatchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { containerName, containerSize, inStock } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ErrorHandler("Invalid ID", 404));
    }
    const updatedContainer = await containerModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    res.status(200).json(updateContainer);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

//Delete container by id
export const deleteContainer = CatchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ErrorHandler("Invalid ID", 404));
    }

    const deletedContainer = await containerModel.findByIdAndDelete(id);
    res.status(200).json({ success: true, deletedContainer });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
