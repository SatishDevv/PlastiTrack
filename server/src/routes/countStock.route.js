import express from "express";
import validate from "../middleware/validate.js";
import { countAssignmentStock } from "../controllers/countStock.controller.js";

const countStockRouter = express.Router();

countStockRouter.get(
  "/:transactionId/:userId",
  countAssignmentStock
); 

export default countStockRouter;
