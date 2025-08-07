const express = require("express");
const router = express.Router();
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../controllers/user");

//home page
router.get("/", (req, res) => {
  res.send("home page");
});
//create a new user
router.post("/", createUser);
//get all users
router.get("/users", getAllUsers);
//get user by userId
router.get("/:id", getUserById);
//update user by userId
router.put("/:id", updateUserById);
//delete a user
router.delete("/:id", deleteUserById);

module.exports = router;
