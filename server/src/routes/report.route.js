import express from "express"
import { getContainerStockReport } from "../controllers/report.controller.js"

const reportRouter = express.Router()

reportRouter.get("/", getContainerStockReport)

export default reportRouter