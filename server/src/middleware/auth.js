import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { User } from "../models/User.js";
import { Workspace } from "../models/Workspace.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const requireAuth = asyncHandler(async (req, res, next) => {
  const headerToken = req.headers.authorization?.startsWith("Bearer ")
    ? req.headers.authorization.slice(7)
    : null;
  const token = headerToken || req.cookies?.token;

  if (!token) {
    throw new ApiError(401, "Authentication required");
  }

  const payload = jwt.verify(token, env.jwtSecret);
  const user = await User.findById(payload.sub);

  if (!user) {
    throw new ApiError(401, "User no longer exists");
  }

  req.user = user;
  next();
});

export const requireWorkspaceMember = asyncHandler(async (req, res, next) => {
  const workspaceId = req.params.workspaceId || req.body.workspace;

  if (!workspaceId) {
    throw new ApiError(400, "Workspace id is required");
  }

  const workspace = await Workspace.findOne({
    _id: workspaceId,
    "members.user": req.user._id,
  });

  if (!workspace) {
    throw new ApiError(403, "You do not have access to this workspace");
  }

  req.workspace = workspace;
  next();
});
