import express from "express";
import {
  createProject,
  getProjectbyId,
  getAllProjects,
  getAllTasks,
  patchProject,
  deleteProject,
  getProjectMembers,
  assignProject,
} from "../controllers/project.controller.js";

const router = express.Router();

router.post("", createProject);

router.get("", getAllProjects);

router.get("/tasks", getAllTasks);

router.post("/assign", assignProject);

router.get("/members", getProjectMembers);

router.get("/:id", getProjectbyId);

router.patch("", patchProject);

router.delete("/:id", deleteProject);

export default router;
