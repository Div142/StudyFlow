import { Workspace } from "../models/Workspace.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { createActivity } from "../utils/activity.js";

export const listWorkspaces = asyncHandler(async (req, res) => {
  const workspaces = await Workspace.find({ "members.user": req.user._id })
    .populate("members.user", "username email avatarUrl")
    .sort({ updatedAt: -1 });

  res.json({ workspaces });
});

export const createWorkspace = asyncHandler(async (req, res) => {
  const workspace = await Workspace.create({
    ...req.body,
    owner: req.user._id,
    members: [{ user: req.user._id, role: "owner" }],
  });

  await createActivity(req, {
    workspace: workspace._id,
    type: "workspace.updated",
    message: `created workspace ${workspace.name}`,
  });

  res.status(201).json({ workspace });
});
