import express from "express";
import { helloMessage } from "../controllers/task.controller";

const router = express.Router();

router.get("/hello", helloMessage);

export default router;
