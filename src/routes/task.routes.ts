import express from "express";

import { getTasks, getTasksToday } from "../controllers/task.controller";

const router = express.Router();


// Task routes
router.get("", getTasks);
router.get("/today", getTasksToday);

export default router;
