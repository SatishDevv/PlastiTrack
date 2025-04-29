import express from "express";
import { cardData, getConsumerReport, getCustomerReport, getVendorReport, } from "../controllers/dashboard.controller.js";

const dashboardRouter = express.Router();

dashboardRouter.get("/", cardData);

dashboardRouter.get("/all", getConsumerReport);

dashboardRouter.get("/vendor/all", getVendorReport);

dashboardRouter.get("/customer/all", getCustomerReport);

export default dashboardRouter;
