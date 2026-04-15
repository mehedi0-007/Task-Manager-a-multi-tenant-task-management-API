import express from "express";
import orgRoutes from "./routes/orgRoutes.js";
import taskRoutes from "./routes/taskRoutes.js"; 
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from './routes/projectRoutes.js';


const app = express();

app.use(express.json());

app.use('/org',orgRoutes);
app.use("/task", taskRoutes);
app.use("/user", userRoutes);
app.use("/project", projectRoutes);

export default app;