import { Router } from "express";
import { z } from "zod";
import { listActivity } from "../controllers/activityController.js";
import { requireAuth, requireWorkspaceMember } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";

const router = Router();

const paramsSchema = z.object({
  params: z.object({
    workspaceId: z.string().min(1),
  }),
});

router.use(requireAuth);
router.get("/:workspaceId", validate(paramsSchema), requireWorkspaceMember, listActivity);

export default router;
