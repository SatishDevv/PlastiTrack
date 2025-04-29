import express from "express";
import {
  assignmentCount,
  createContainerAssignments,
  getAssignmentsAllotedByUser,
  dispatchAssignment,
  getAllAssignment,
  getAssignment,
  getUserBaseOnRole,
  generateQrCode,
  showQrDetailsPage,
  getUsersByRoleId,
} from "../controllers/assignAssignment.controller.js";
import validate from "../middleware/validate.js";
import { containerAssignmentSchema } from "../validations/containerAssignment.schema.js";

const assignAssignment = express.Router();

assignAssignment.get("/allotedAssignments/:_id", getAssignmentsAllotedByUser); //(_id: userID)

assignAssignment.post(
  "/assign",
  validate(containerAssignmentSchema),
  createContainerAssignments
);

assignAssignment.post("/dispatch/:assignmentId", dispatchAssignment);

assignAssignment.get("/:createdById", getAssignment);

assignAssignment.get("/user/:_id", getUserBaseOnRole);

assignAssignment.get("/:containerId/:userId", assignmentCount);

assignAssignment.get("/getAll/assignment", getAllAssignment);

assignAssignment.get("/user/:userId", getUserBaseOnRole);

assignAssignment.post("/generateQr/:_id", generateQrCode);

assignAssignment.get("/generateQr/details/:assignmentId", showQrDetailsPage);

assignAssignment.get("/user/role/:_id", getUsersByRoleId)

export default assignAssignment;
