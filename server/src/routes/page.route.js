import express from "express";
import { createPage } from "../controllers/pages.controller.js";


const pageRouter = express.Router();

pageRouter.post("/" , createPage); // Create new role


export default pageRouter;
