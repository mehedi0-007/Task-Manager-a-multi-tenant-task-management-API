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
      required: true,
    },
    taskEmployee: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "user",
      },
    ],
    deadline: {
      type: Date,
    },
  },
  { timestamps: true },
);

const Task = mongoose.model("Task", taskShema);

export default Task;
