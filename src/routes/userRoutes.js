import {createUser, getUsers} from "../controllers/user.controller.js";
import express from "express";

const router = express.Router();

router.post("/create", createUser);
router.get("/getUsers", getUsers)

export default router;
