import express from "express";

import { createTask, getTasks, getTasksToday } from "../controllers/task.controller";

const router = express.Router();


// Task routes
router.get("", getTasks);
router.get("/today", getTasksToday);
router.post("", createTask); // Assuming you have a createTask function in your controller

export default router;
