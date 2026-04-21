import express from "express";
import {
  createTask,
  getAllTasks,
  patchTask,
  getTaskbyId,
  deleteManyTask,
} from "../controllers/task.controller.js";

const router = express.Router();

router.post("", createTask);

router.get("", getAllTasks);

router.get("/:id", getTaskbyId);

router.patch("", patchTask);

router.delete("", deleteManyTask);

export default router;
