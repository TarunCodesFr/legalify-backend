import { Router } from "express";
import { sendRequest } from "../controllers/content.controller";

const router = Router();

router.post("/content", sendRequest);

export default router;
