import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  admins: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
  ],
  employees: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
  ],
  tasks: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "task",
    },
  ],
  organization: {
    type: mongoose.Schema.ObjectId,
    ref: "organization",
    required: true,
  },
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
