import {
  createUser,
  getAllusers,
  deleteUserbyId,
  getUserbyId,
  patchUser,
} from "../controllers/user.controller.js";
import express from "express";

const router = express.Router();

router.post("", createUser);

router.get("", getAllusers);

router.get("/:id", getUserbyId);

router.patch("/:id", patchUser);

router.delete("/:id", deleteUserbyId);

export default router;
