import { Router } from "express";
import { z } from "zod";
import { createWorkspace, listWorkspaces } from "../controllers/workspaceController.js";
import { requireAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";

const router = Router();

const workspaceSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(80),
    description: z.string().max(280).optional(),
  }),
});

router.use(requireAuth);
router.get("/", listWorkspaces);
router.post("/", validate(workspaceSchema), createWorkspace);

export default router;
