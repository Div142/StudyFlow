import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env.js";
import activityRoutes from "./routes/activityRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import workspaceRoutes from "./routes/workspaceRoutes.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors({
    origin: env.clientOrigin,
    credentials: true,
  }));
  app.use(express.json({ limit: "1mb" }));
  app.use(cookieParser());
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 300,
  }));

  if (env.nodeEnv !== "test") {
    app.use(morgan("dev"));
  }

  app.get("/health", (req, res) => {
    res.json({ status: "ok", service: "studyflow-api" });
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/workspaces", workspaceRoutes);
  app.use("/api/projects", projectRoutes);
  app.use("/api/tasks", taskRoutes);
  app.use("/api/activity", activityRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
