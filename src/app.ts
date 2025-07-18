import dotenv from "dotenv";
import express from "express";

import taskRoutes from "./routes/task.routes";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/tasks", taskRoutes);

export default app;
