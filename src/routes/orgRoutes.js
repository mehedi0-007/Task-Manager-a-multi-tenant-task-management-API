import express from "express";
import {
  createOrg,
  getOrg,
  patchOrg,
  deleteOrg,
} from "../controllers/org.controller.js";

const router = express.Router();

router.post("/createOrg", createOrg);

router.get("/getOrg/:id", getOrg);

router.put("/updateOrg", patchOrg);

router.delete("/deleteOrg", deleteOrg);

export default router;
