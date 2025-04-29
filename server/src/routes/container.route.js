import express from "express";

import {
  createContainer,
  deleteContainer,
  getAllContainer,
  getContainerbyId,
  updateContainer,
} from "../controllers/container.controller.js";

const containerRouter = express.Router();

containerRouter.post("/", createContainer); //create container

containerRouter.get("/", getAllContainer); //get all container

containerRouter.get("/:id", getContainerbyId); // get container by id

containerRouter.put("/:id", updateContainer); //update container by id

containerRouter.delete("/:id", deleteContainer); //delete conatiner by id

export default containerRouter;
