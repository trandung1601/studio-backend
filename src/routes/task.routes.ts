import express from "express";
import { getTasks } from "../controllers/task.controller";

const router = express.Router();

router.get("/hello", getTasks);

export default router;
