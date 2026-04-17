import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    maxlength: 20,
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false,
  },

  org: {
    type: mongoose.Schema.ObjectId,
    ref: "Organization",
  },

  projects: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Project",
    },
  ],

  role: {
    type: String,
    enum: ["user", "employee", "admin", "rootAdmin", "owner"],
    default: "user",
  },
});

const user = mongoose.model("User", userSchema);

export default user;
