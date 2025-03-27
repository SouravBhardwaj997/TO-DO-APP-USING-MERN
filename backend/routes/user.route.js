import { Router } from "express";
import { createNewUser, loginUser } from "../controllers/user.controller.js";
const router = Router();

router.post("/sign-up", createNewUser);

router.post("/login", loginUser);

export default router;
