import express from "express";
import { getTransactionFlowStatus } from "../controllers/trackFlowStatus.controller.js";


const trackFlowStatusRouter = express.Router();

trackFlowStatusRouter.get("/flow", getTransactionFlowStatus);

export default trackFlowStatusRouter;
