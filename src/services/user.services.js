import { hashPass } from "../utilities/encryptPassword.js";
import user from "../models/user.models.js";
import Project from "../models/projects.model.js";

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

export const getAllUsersService = async () => {
  const users = await user.find();
  if (users.length < 1) throw new Error("No user found right now");

  return users;
};

export const deleteUserbyIdService = async (userId) => {
  const existing = await user.findById(userId);
  if (!existing) throw new Error("User not found");

  await user.deleteOne({ _id: userId });

  await Project.updateMany(
    { admins: userId },
    {
      $pull: {
        admins: userId,
      },
    },
  );

  await Project.updateMany(
    { employees: userId },
    {
      $pull: {
        employees: userId,
      },
    },
  );
};
