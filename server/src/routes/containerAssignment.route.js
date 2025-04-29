import express from "express";
import {
  getContainerAssignmentById,
  deleteContainerAssignment,
  updateContainerAssignment,
} from "../controllers/containerAssignment.controller.js";

const containerAssignmentRouter = express.Router();

containerAssignmentRouter.get("/:id", getContainerAssignmentById);

containerAssignmentRouter.put("/:id", updateContainerAssignment);

containerAssignmentRouter.delete("/:id", deleteContainerAssignment);

export default containerAssignmentRouter;
