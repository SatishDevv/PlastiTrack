import express from "express";
import { getStock } from "../controllers/userStock.controller.js";


const stockRouter = express.Router();

stockRouter.get("/", getStock); 

export default stockRouter;
