import express from "express";
import { createActions } from "../controllers/action.controller.js";


const actionRoutes = express.Router();

actionRoutes.post('/', createActions); // Bulk create

export default actionRoutes;
 