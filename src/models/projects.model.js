import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
  },
  projectAdmins: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
  ],
  projectEmployee: [
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
