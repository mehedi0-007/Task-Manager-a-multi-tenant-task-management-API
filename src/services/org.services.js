import Organization from "../models/organization.model.js";
import Project from "../models/projects.model.js";
import Task from "../models/task.model.js";
import user from "../models/user.models.js";

export const createOrgService = async ({ title, description, owner }) => {
  const newOrg = new Organization({ title, description, owner });
  await newOrg.save();
};

export const getOrgService = async (orgId) => {
  const orgData = await Organization.findById(orgId);
  if (!orgData) throw new Error("Organization not found");

  return orgData;
};

export const patchOrgService = async (orgId, updateField) => {
  const orgData = await Organization.findByIdAndUpdate(orgId, updateField, {
    new: true,
  });

  if (!orgData) throw new Error("Organization not found");
  return orgData;
};

export const deleteOrgService = async (orgId) => {
  const delOrg = await Organization.findByIdAndDelete(orgId);

  if (!delOrg) throw new Error("Organization not found");

  await Promise.all([
    await Project.deleteMany({ _id: { $in: delOrg.projects } }),

    await Task.deleteMany({ org: orgId }),

    await user.updateMany({ org: orgId }, { $set: { org: null } }),
  ]);
};
