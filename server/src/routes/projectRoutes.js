import { Router } from "express";
import { z } from "zod";
import { createProject, listProjects } from "../controllers/projectController.js";
import { requireAuth, requireWorkspaceMember } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";

const router = Router();

const paramsSchema = z.object({
  params: z.object({
    workspaceId: z.string().min(1),
  }),
});

const projectSchema = paramsSchema.extend({
  body: z.object({
    name: z.string().min(2).max(80),
    icon: z.string().max(4).optional(),
    color: z.string().max(24).optional(),
  }),
});

router.use(requireAuth);
router.get("/:workspaceId", validate(paramsSchema), requireWorkspaceMember, listProjects);
router.post("/:workspaceId", validate(projectSchema), requireWorkspaceMember, createProject);

export default router;
