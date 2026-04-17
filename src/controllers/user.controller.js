import {
  createUserService,
  deleteUserbyIdService,
  getAllUsersService,
  getUserbyIdService,
} from "../services/user.services.js";

export const createUser = async (req, res) => {
  try {
    await createUserService(req.body);
    res.status(200).json("User Created");
  } catch (err) {
    console.log(err);
    res.status(404).json("Database error");
  }
};

export const getUserbyId = async (req, res) => {
  try {
    const userData = await getUserbyIdService(req.params.id);
    res.status(200).json({ userDetails: userData });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

export const getAllusers = async (req, res) => {
  try {
    const users = await getAllUsersService();
    res.status(200).send(users);
  } catch {
    res.status(400).json("Not found");
  }
};

export const deleteUserbyId = async (req, res) => {
  try {
    await deleteUserbyIdService(req.params.id);
    res.status(200).json({
      msg: "User deleted successfully",
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};
