import { Router } from "express";
import { protectRoute } from "../middlewares/auth.middleware";

const router = Router();

// 🔥 Apply once
router.use(protectRoute);

export default router;
