import mongoose from "mongoose";

const taskShema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    project: {
      type: mongoose.Schema.ObjectId,
      ref: "project",
    },
    assignedEmployee: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "user",
      },
    ],
  },
  { timestamps: true },
);

const Task = mongoose.model("Task", taskShema);

export default Task;
