import express from "express";
import {
  createContainerTransaction,
  deleteTransactionById,
  getAllTransaction,
  getContainerCountForTransaction,
  getTransactionById,
  getTransactionFlowStatus,
  updateTransactionById,
} from "../controllers/containerTransaction.controller.js";

const transactionRouter = express.Router();

transactionRouter.post("/", createContainerTransaction);

transactionRouter.get("/getAll", getAllTransaction);

transactionRouter.get("/:id", getTransactionById);

transactionRouter.put("/:id", updateTransactionById);

transactionRouter.delete("/:id", deleteTransactionById);

transactionRouter.get("/allot-container/:id", getTransactionFlowStatus);

transactionRouter.get("/count/:containerId", getContainerCountForTransaction);

export default transactionRouter;
