import { Task } from "../models/Task.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { createActivity } from "../utils/activity.js";
import { emitWorkspaceEvent } from "../socket/socket.js";

const populateTask = (query) => query
  .populate("assignees", "username email avatarUrl")
  .populate("createdBy", "username email avatarUrl")
  .populate("project", "name icon color");

export const listTasks = asyncHandler(async (req, res) => {
  const filter = { workspace: req.workspace._id };

  if (req.query.status) filter.status = req.query.status;
  if (req.query.priority) filter.priority = req.query.priority;
  if (req.query.project) filter.project = req.query.project;
  if (req.query.tag) filter.tags = req.query.tag;
  if (req.query.search) filter.$text = { $search: req.query.search };

  const tasks = await populateTask(Task.find(filter))
    .sort({ status: 1, order: 1, dueAt: 1, createdAt: -1 });

  res.json({ tasks });
});

export const createTask = asyncHandler(async (req, res) => {
  const task = await Task.create({
    ...req.body,
    workspace: req.workspace._id,
    createdBy: req.user._id,
  });

  const populated = await populateTask(Task.findById(task._id));

  await createActivity(req, {
    workspace: req.workspace._id,
    project: populated.project?._id,
    task: populated._id,
    type: "task.created",
    message: `created task ${populated.title}`,
  });

  emitWorkspaceEvent(req, req.workspace._id, "task:created", populated);
  res.status(201).json({ task: populated });
});

export const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.taskId, workspace: req.workspace._id },
    req.body,
    { new: true, runValidators: true },
  );

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  const populated = await populateTask(Task.findById(task._id));

  await createActivity(req, {
    workspace: req.workspace._id,
    project: populated.project?._id,
    task: populated._id,
    type: "task.updated",
    message: `updated task ${populated.title}`,
  });

  emitWorkspaceEvent(req, req.workspace._id, "task:updated", populated);
  res.json({ task: populated });
});

export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.taskId, workspace: req.workspace._id });

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  await createActivity(req, {
    workspace: req.workspace._id,
    project: task.project,
    task: task._id,
    type: "task.deleted",
    message: `deleted task ${task.title}`,
  });

  emitWorkspaceEvent(req, req.workspace._id, "task:deleted", { id: task._id });
  res.status(204).send();
});
