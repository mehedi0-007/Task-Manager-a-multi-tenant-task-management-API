import Project from "../models/projects.model.js";
import Organization from "../models/organization.model.js";
import Task from "../models/task.model.js";
import User from "../models/user.models.js";
import user from "../models/user.models.js";

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
  const allTasks = await Task.find({ project: projectId });

  if (!allTasks) throw new Error("No task found for this project");
  return allTasks;
};

export const assignProjectService = async (projectId, userId, role) => {
  if (role == "admin") {
    await Project.findByIdAndUpdate(projectId, {
      $push: {
        admins: userId,
      },
    });
  } else {
    await Project.findByIdAndUpdate(projectId, {
      $push: {
        employees: userId,
      },
    });
  }
};

export const getProjectMembersService = async (projectId) => {
  const members = await user.find({ projects: projectId });

  if (!members) throw new Error("No member found for this project");

  return members;
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
