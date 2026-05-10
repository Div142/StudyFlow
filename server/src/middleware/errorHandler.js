import { ZodError } from "zod";
import { ApiError } from "../utils/ApiError.js";

export function notFound(req, res, next) {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
}

export function errorHandler(error, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }

  if (error instanceof ZodError) {
    return res.status(422).json({
      message: "Validation failed",
      details: error.flatten(),
    });
  }

  const statusCode = error.statusCode || 500;
  return res.status(statusCode).json({
    message: error.message || "Internal server error",
    details: error.details || null,
  });
}
