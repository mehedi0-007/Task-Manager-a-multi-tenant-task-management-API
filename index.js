import express from "express";
import orgRoutes from "./src/routes/orgRoutes.js";
import taskRoutes from "./src/routes/taskRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import projectRoutes from "./src/routes/projectRoutes.js";
import connectDB from "./src/config/db.js";
import "dotenv/config";

const app = express();

app.use(express.json());

app.use("/org", orgRoutes);
app.use("/task", taskRoutes);
app.use("/users", userRoutes);
app.use("/project", projectRoutes);

const port = process.env.PORT;

const server = async () => {
  try {
    connectDB();
    app.listen(port, () => {
      console.log(`Server is running at port ${port}`);
    });
  } catch {
    console.log("Server side error");
  }
};

server();

export default app;
