import {
  createTaskService,
  getAllTasksServcie,
  getTaskbyIdService,
  deleteManyTaskService,
  patchTaskService,
} from "../services/task.services";

export const createTask = async (req, res) => {
  try {
    await createTaskService(req.body);
    res.status(200).json("Task created successfully");
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const query = req.query;
    const allTaskData = await getAllTasksServcie(query);

    res.status(200).json({
      allTaskData,
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

export const getTaskbyId = async (req, res) => {
  try {
    const taskData = await getTaskbyIdService(req.params.id);
    res.status(200).json(taskData);
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

export const patchTask = async (req, res) => {
  try {
    const patchedTaskData = await patchTaskService(req.params.id);
    res.status(200).json(patchedTaskData);
  } catch (err) {
    res.status(400).json({
      eroor: err.message,
    });
  }
};

export const deleteManyTask = async (req, res) => {
  try {
    const allTaskId = req.body;
    await deleteManyTaskService(allTaskId);
    res.status(200).json("All selected tasks deleted");
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};
