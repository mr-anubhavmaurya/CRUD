const User = require("../models/user");

// create user
async function createUser(req, res) {
  try {
    const { name, age, email } = req.body;
    const response = await User.create({
      name,
      age,
      email,
    });
    return res.status(201).json({ response, message: "user created" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ err: "error" });
  }
}
// get all users
async function getAllUsers(req, res) {
  try {
    const result = await User.find({});
    if (!result) {
      return res.status(404).json({ message: "User not found!" });
    }
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error!" });
  }
}
// get user by id
async function getUserById(req, res) {
  try {
    const id = req.params.id;
    const response = await User.findOne({ _id: id });
    if (!response) {
      res.status(404).json({ error: "User not found" });
    }
    return res.status(201).json(response);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error!" });
  }
}
//update a user by id
async function updateUserById(req, res) {
  try {
    const userId = req.params.id;
    const { name, age } = req.body;
    console.log(userId);
    // console.log(userData);
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { name, age } },
      { new: true }
    );
    console.log("user", user);
    return res.status(200).json({ message: "user updated" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
}
//delete a user by id
async function deleteUserById(req, res) {
  try {
    const userId = req.params.id;
    const user = await User.findOneAndDelete({ _id: userId });
    // console.log(user)
    return res.status(200).json({ message: "user deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
}
module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
