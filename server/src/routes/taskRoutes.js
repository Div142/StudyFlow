import { Router } from "express";
import { z } from "zod";
import { createTask, deleteTask, listTasks, updateTask } from "../controllers/taskController.js";
import { requireAuth, requireWorkspaceMember } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";

const router = Router();

const paramsSchema = z.object({
  params: z.object({
    workspaceId: z.string().min(1),
  }),
});

const taskIdParamsSchema = z.object({
  params: z.object({
    workspaceId: z.string().min(1),
    taskId: z.string().min(1),
  }),
});

const taskBodySchema = z.object({
  title: z.string().min(1).max(160),
  description: z.string().max(4000).optional(),
  status: z.enum(["todo", "doing", "done"]).optional(),
  priority: z.enum(["urgent", "normal", "later"]).optional(),
  dueAt: z.string().datetime().nullable().optional(),
  order: z.number().optional(),
  tags: z.array(z.string().min(1).max(32)).optional(),
  subtasks: z.array(z.object({
    title: z.string().min(1).max(160),
    completed: z.boolean().optional(),
  })).optional(),
  project: z.string().nullable().optional(),
  assignees: z.array(z.string()).optional(),
});

const listTasksSchema = paramsSchema.extend({
  query: z.object({
    status: z.enum(["todo", "doing", "done"]).optional(),
    priority: z.enum(["urgent", "normal", "later"]).optional(),
    project: z.string().optional(),
    tag: z.string().optional(),
    search: z.string().optional(),
  }),
});

const createTaskSchema = paramsSchema.extend({
  body: taskBodySchema,
});

const updateTaskSchema = taskIdParamsSchema.extend({
  body: taskBodySchema.partial(),
});

router.use(requireAuth);
router.get("/:workspaceId", validate(listTasksSchema), requireWorkspaceMember, listTasks);
router.post("/:workspaceId", validate(createTaskSchema), requireWorkspaceMember, createTask);
router.patch("/:workspaceId/:taskId", validate(updateTaskSchema), requireWorkspaceMember, updateTask);
router.delete("/:workspaceId/:taskId", validate(taskIdParamsSchema), requireWorkspaceMember, deleteTask);

export default router;
