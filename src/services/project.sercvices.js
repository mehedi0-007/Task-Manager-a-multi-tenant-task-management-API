import Project from "../models/projects.model.js";
import Organization from "../models/organization.model.js";
import Task from "../models/task.model.js";
import User from "../models/user.models.js";

export const createProjectService = async ({
  title,
  description,
  organization,
}) => {
  const org = Organization.findById(organization);

  if (!org) throw new Error("Organization not found");

  const newProject = new Project({ title, description, organization });
  await newProject.save();

  await Organization.findByIdAndUpdate(organization, {
    $push: { projects: newProject._id },
  });
};

export const getallProjectService = async (query) => {
  const allProjectsData = await Project.find(query);
  return allProjectsData;
};

export const getProjectbyIdService = async (projectId) => {
  const projectData = await Project.findById(projectId);
  return projectData;
};

export const getProjectTasksService = async (projectId) => {
  const allTasks = await Project.findById(projectId).populate(
    "tasks",
    "title description",
  );

  if (!allTasks) throw new Error("No task found for this project");
  return allTasks;
};

export const patchProjectService = async (projectId, updateField) => {
  const patchedProject = await Project.findByIdAndUpdate(
    projectId,
    updateField,
    { new: true },
  );

  return patchedProject;
};

export const deleteProjectService = async (projectId) => {
  const deletedProject = await Project.findByIdAndDelete(projectId);

  if (!deletedProject) throw new Error("Project not found");

  await Promise.all([
    Organization.findByIdAndUpdate(deletedProject.organization, {
      $pull: { projects: projectId },
    }),

    Task.deleteMany({ _id: { $in: deletedProject.tasks } }),

    User.updateMany(
      { _id: { $in: [...deletedProject.admins, ...deletedProject.employees] } },
      {
        $pull: { projects: deletedProject._id },
      },
    ),
  ]);
};
