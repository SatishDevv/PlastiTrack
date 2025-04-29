import express from "express";

import { createRole, getAllRoles, getRoleById, updateRole, deleteRole } from "../controllers/role.controller.js";

const roleRouter = express.Router();

roleRouter.post("/" , createRole  ); // Create new role

roleRouter.get("/", getAllRoles); // Get All roles

roleRouter.get("/:id", getRoleById); // Get Single Role by ID

roleRouter.put("/:id", updateRole); // Update Role

roleRouter.delete("/:id", deleteRole); // Delete Role

export default roleRouter;
