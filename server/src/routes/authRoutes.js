import { Router } from "express";
import { z } from "zod";
import { login, me, register } from "../controllers/authController.js";
import { requireAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";

const router = Router();

const registerSchema = z.object({
  body: z.object({
    username: z.string().min(2).max(40),
    email: z.string().email(),
    password: z.string().min(8),
  }),
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8),
  }),
});

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.get("/me", requireAuth, me);

export default router;
