import {
  createUser,
  getAllusers,
  deleteUserbyId,
  getUserbyId,
} from "../controllers/user.controller.js";
import express from "express";

const router = express.Router();

router.post("/create", createUser);

router.get("/getAllusers", getAllusers);

router.get("/getUserbyId/:id", getUserbyId);

// router.get("/getFilterUsers", getFilterUsers);

// router.patch("/patchUser/:id", patchUser);

router.delete("/deleteUserbyId/:id", deleteUserbyId);

// router.delete("/deleteManyUser", deleteManyUser);

export default router;
