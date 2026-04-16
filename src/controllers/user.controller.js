import user from "../models/user.models.js";

export const createUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    console.log(req.body);
    const newUser = new user({ username, email, password, role });
    await newUser.save();

    res.status(200).json("User Created");
  } catch (err) {
    console.log(err);
    res.status(404).json("Database error");
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await user.find();
    res.status(200);
    res.send(users);
  } catch {
    res.status(400).json("Not found");
  }
};
