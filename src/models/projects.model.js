import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: {
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
  organization: {
    type: mongoose.Schema.ObjectId,
    ref: "organization",
  },
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
