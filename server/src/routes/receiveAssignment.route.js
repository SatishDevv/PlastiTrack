import express from "express";
import { getAllAssignmentDisptachToUser, receiveAssignment } from "../controllers/receiveAssignment.controller.js";

const receiveAssignmnetRouter = express.Router();

receiveAssignmnetRouter.get("/:_id", getAllAssignmentDisptachToUser); //_id : UserId

receiveAssignmnetRouter.post("/assignment/:assignmentId", receiveAssignment)

export default receiveAssignmnetRouter;
