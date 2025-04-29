import express from "express";
import { createStatus , deleteStatus, getAllStatus, getStatusById, updateStatus} from "../controllers/status.controller.js";


const statusRouter = express.Router();

statusRouter.post("/", createStatus);  // Create new role

statusRouter.get("/", getAllStatus ); //Get all status

statusRouter.get("/:id", getStatusById); //Get Satus by ID

statusRouter.put("/:id", updateStatus); //Update status by ID

statusRouter.delete("/:id", deleteStatus); //Delete status by ID

export default statusRouter;
