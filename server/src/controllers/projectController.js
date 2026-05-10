import { Project } from "../models/Project.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { createActivity } from "../utils/activity.js";

export const listProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({ workspace: req.workspace._id }).sort({ updatedAt: -1 });
  res.json({ projects });
});

export const createProject = asyncHandler(async (req, res) => {
  const project = await Project.create({
    ...req.body,
    workspace: req.workspace._id,
    createdBy: req.user._id,
  });

  await createActivity(req, {
    workspace: req.workspace._id,
    project: project._id,
    type: "project.created",
    message: `created project ${project.name}`,
  });

  res.status(201).json({ project });
});
