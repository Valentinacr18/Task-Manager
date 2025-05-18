const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// GET all users
router.get("/", userController.getAllUsers);

// POST new user
router.post("/", userController.createUser);

// GET tasks for a specific user
router.get("/:id/tasks", userController.getUserTasks);

module.exports = router;