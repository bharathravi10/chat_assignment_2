import express from "express";
import { authenticate } from "../middleware/authMiddleware";
import { upload } from "../middleware/uploadMiddleware";
import { getChats, importChat } from "../controllers/chat.controller";

const router = express.Router();

router.post("/import", authenticate, upload.single("file"), importChat);
router.get("/", authenticate, getChats);

export default router;
