import {
  createOrgService,
  getOrgService,
  patchOrgService,
  deleteOrgService,
} from "../services/org.services.js";

export const createOrg = async (req, res) => {
  try {
    await createOrgService(req.body);
    res.status(201).json("Organization created");
  } catch (err) {
    res.status(400).json(err.message);
  }
};

export const getOrg = async (req, res) => {
  try {
    const orgData = await getOrgService(req.params.id);
    res.status(200).json(orgData);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

export const patchOrg = async (req, res) => {
  try {
    const orgData = await patchOrgService(req.params.id, req.body);
    res.status(201).json(orgData);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

export const deleteOrg = async (req, res) => {
  try {
    await deleteOrgService(req.params.id);
    (res, status(200).json("Organization deleted"));
  } catch (err) {
    res.status(400).json(err.message);
  }
};
