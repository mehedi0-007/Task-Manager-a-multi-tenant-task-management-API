import { hashPass } from "../utilities/encryptPassword.js";
import user from "../models/user.models.js";
import Project from "../models/projects.model.js";
import Task from "../models/task.model.js";

export const createUserService = async ({ username, email, password }) => {
  const existing = await user.findOne({ email });
  if (!existing) {
    const pass = await hashPass(password);
    const newUser = new user({ username, email, password: pass });
    await newUser.save();
  } else {
    throw new Error("User exists with same email");
  }
};

export const getUserbyIdService = async (userId) => {
  const userData = await user.findById(userId);
  if (!userData) throw new Error("User not found");

  return userData;
};

export const getAllUsersService = async (query) => {
  const users = await user.find(query);
  if (users.length == 0) throw new Error("No user found right now");

  return users;
};

export const patchUserService = async (userId, updateField) => {
  const updateUser = user.findByIdAndUpdate(userId, updateField, { new: true });
  return updateUser;
};

export const deleteUserbyIdService = async (userId) => {
  const existing = await user.findByIdAndDelete(userId);
  if (!existing) throw new Error("User not found");

  await Promise.all([
    Project.updateMany(
      { $or: [{ admins: userId }, { employees: userId }] },
      {
        $pull: {
          admins: userId,
          employees: userId,
        },
      },
    ),

    Task.updateMany(
      { assignedEmployee: userId },
      {
        $pull: {
          assignedEmployee: userId,
        },
      },
    ),
  ]);
};
