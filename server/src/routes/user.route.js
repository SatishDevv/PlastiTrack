import express from "express";
import {
  activateUser,
  registrationsUser,
  loginUser,
  logoutUser,
  updateAccessToken,
  updateUser,
  deleteUser,
  getUserById,
  getAllUsers,
  createUsers,
  restoreUser,
  forgotPassword,
  resetPasswordWithLink,
  getResetPasswordPage,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/registration", registrationsUser);

userRouter.post("/activate-user", activateUser);

userRouter.post("/login", loginUser);

userRouter.get("/logout", isAuthenticated, logoutUser);

userRouter.get("/refresh", updateAccessToken);

userRouter.post("/", createUsers);

userRouter.put("/:id", updateUser);

userRouter.post("/forgotPassword", forgotPassword);

userRouter.post("/resetPassword/:token", resetPasswordWithLink);

userRouter.get("/form/resetPassword/:token", getResetPasswordPage);

userRouter.delete("/:id", deleteUser);

userRouter.get("/:id", getUserById);

userRouter.get("/", getAllUsers);

userRouter.put("/restore/:id", restoreUser);

export default userRouter;
