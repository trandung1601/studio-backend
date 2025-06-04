import express from "express";
import dotenv from "dotenv";
import taskRoutes from "./routes/task.routes";

dotenv.config();

const app = express();

app.use("/api/sample", taskRoutes);

export default app;
