import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./middleware/error.js";
import userRouter from "./routes/user.route.js";
import roleRouter from "./routes/role.route.js";
import statusRouter from "./routes/status.route.js";
import { configureCors } from "./config/corsConfig.js";
import { logger } from "./utils/logger.js";
import containerRouter from "./routes/container.route.js";
import containerAssignmentRouter from "./routes/containerAssignment.route.js";
import transactionRouter from "./routes/containerTransaction.route.js";
import pageRouter from "./routes/page.route.js";
import actionRoutes from "./routes/action.route.js";
import assignAssignment from "./routes/assignAssignment.route.js";
import reportRouter from "./routes/report.route.js";
import dashboardRouter from "./routes/dashboard.route.js";
import notifyRouter from "./routes/notify.route.js";
import stockRouter from "./routes/userStock.route.js";
import countStockRouter from "./routes/countStock.route.js";
import receiveAssignmnetRouter from "./routes/receiveAssignment.route.js";
import trackFlowStatusRouter from "./routes/trackFlowStatus.route.js";

dotenv.config();
export const app = express();

app.use(configureCors()); // cors (cross origin resource sharing)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", "./view");

// cookie parser
app.use(cookieParser());

// Request Logger Middleware
app.use((req, res, next) => {
  logger.info(
    `Request ${req.method} - ${req.originalUrl} - ${req.ip} - ${new Date()}`
  );
  logger.info(`Body: ${JSON.stringify(req.body)}`);

  next();
});

// Routers
app.use("/api/v1/user", userRouter);
app.use("/api/v1/role", roleRouter);
app.use("/api/v1/status", statusRouter);
app.use("/api/v1/container", containerRouter);
app.use("/api/v1/assignment", containerAssignmentRouter);
app.use("/api/v1/transaction", transactionRouter);
app.use("/api/v1/assignAssignment", assignAssignment);
app.use("/api/v1/dashboard", dashboardRouter);
app.use("/api/v1/notify", notifyRouter);
app.use("/api/v1/page", pageRouter);
app.use("/api/v1/action", actionRoutes);
app.use("/api/v1/report", reportRouter);
app.use("/api/v1/user-stock", stockRouter);
app.use("/api/v1/count", countStockRouter);
app.use("/api/v1/receiveAssignment", receiveAssignmnetRouter);
app.use("/api/v1/track", trackFlowStatusRouter);

// test api
app.use("/test", (req, res, next) => {
  logger.info("✅ API is working ");
  res.status(200).json({
    success: true,
    message: "✅  API is Working",
  });
});

app.use("*", (req, res, next) => {
  const err = new Error(`Route ${req.originalUrl} Not Found`);
  err.statusCode = 404;
  logger.error(`Route ${req.originalUrl} Not Found`);
  next(err);
});

app.use(ErrorMiddleware);
