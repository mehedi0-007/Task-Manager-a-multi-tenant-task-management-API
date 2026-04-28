import {
  createProjectService,
  getallProjectService,
  getProjectTasksService,
  getProjectbyIdService,
  patchProjectService,
  deleteProjectService,
  getProjectMembersService,
  assignProjectService,
} from "../services/project.sercvices.js";

export const createProject = async (req, res) => {
  try {
    await createProjectService(req.body);
    res.status(200).json("Project Created successfully");
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const allProjects = await getallProjectService(req.query);
    res.status(200).json({
      All_Projects: allProjects,
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

export const getProjectbyId = async (req, res) => {
  try {
    const projectData = await getProjectbyIdService(req.params.id);
    res.status(200).json(projectData);
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const projectTasks = await getProjectTasksService(req.params.id);
    res.status(200).json(projectTasks);
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

export const assignProject = async (req, res) => {
  const role = req.body.role;
  const userId = req.body.userId;
  try {
    await assignProjectService(req.params.id, userId, role);
    res.status(201).json(`Assinged ${role} to the project successfully`)
  } catch (err) {
    res.status(400).json(err.message);
  }
};

export const getProjectMembers = async (req, res) => {
  try {
    const members = await getProjectMembersService(req.params.id);
    res.status(200).json(members);
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

export const patchProject = async (req, res) => {
  try {
    const updatedProject = await patchProjectService(req.params.id);
    res.status(200).json(updatedProject);
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    await deleteProjectService(req.params.id);
    res
      .status(200)
      .json("Project deleted successfully with it's corresponding tasks");
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};
