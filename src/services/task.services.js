import Task from "../models/task.model";
import mongoose from "mongoose";

export const createTaskService = async ({ title, description, project }) => {
  const newTask = new Task({ title, description, project });
  await newTask.save();
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

export const deleteManyTaskService = async (allTaskId) => {
  const taskIds = allTaskId.map((id) => new mongoose.Types.ObjectId(id));

  const result = await Task.deleteMany({
    _id: {
      $in: taskIds,
    },
  });

  return result.deletedCount;
};
