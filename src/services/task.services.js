import Project from "../models/projects.model.js";
import Task from "../models/task.model.js";

export const createTaskService = async ({ title, description, project }) => {
  const newTask = new Task({ title, description, project });
  await newTask.save();
  await Project.findByIdAndUpdate(project, {
    $push: { tasks: newTask._id },
  });
};

export const getAssignedEmployeesService = async (taskId) => {
  const employees = Task.findById(taskId).populate(
    "assignedEmployee",
    "username email role",
  );
  if (!employees) throw new Error("No employees found");
  return employees;
};

export const getAllTasksServcie = async (query) => {
  const allTasks = await Task.find(query);
  if (allTasks.length == 0) throw new Error("No task found");
  return allTasks;
};

export const getTaskbyIdService = async (taskId) => {
  const taskData = await Task.findById(taskId);

  return taskData;
};

export const patchTaskService = async (taskId, updateField) => {
  const newtaskData = await Task.findByIdAndUpdate(taskId, updateField, {
    new: true,
  });

  return newtaskData;
};

export const deleteTaskService = async (taskId) => {
  const result = await Task.findByIdAndDelete(taskId);
  await Project.findByIdAndUpdate(result.project, {
    $pull: { tasks: taskId },
  });

  return result.deletedCount;
};
