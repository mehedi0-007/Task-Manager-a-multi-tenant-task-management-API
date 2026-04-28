import express from "express";
import {
  createTask,
  getAllTasks,
  patchTask,
  getTaskbyId,
  deleteManyTask,
  assignEmployee,
} from "../controllers/task.controller.js";

const router = express.Router();

router.post("", createTask);

router.get("", getAllTasks);

router.get("/:id", getTaskbyId);

router.post("/assign/:id", assignEmployee);

router.patch("", patchTask);

router.delete("", deleteManyTask);

export default router;
