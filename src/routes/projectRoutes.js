import express from "express";
import {
  createProject,
  getProjectbyId,
  getAllProjects,
  getAllTasks,
  patchProject,
  deleteProject,
} from "../controllers/project.controller.js";

const router = express.Router();

router.post("", createProject);

router.get("", getAllProjects);

router.get("/tasks", getAllTasks);

router.get("/:id", getProjectbyId);

router.patch("", patchProject);

router.delete("/:id", deleteProject);

export default router;
