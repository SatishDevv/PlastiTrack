import express from "express";

import { dataList } from "../controllers/notifyRouter.controller.js";

const notifyRouter = express.Router();

notifyRouter.get("/:roleName/:id", dataList); 

export default notifyRouter;
