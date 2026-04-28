import mongoose from "mongoose";

const orgSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  projects: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Project",
    },
  ],
  rootAdmins: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
});

const Organization = mongoose.model("Organization", orgSchema);

export default Organization;
