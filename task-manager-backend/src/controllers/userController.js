const User = require("../models/user");
const Task = require("../models/task");

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// Create a new user with validations
exports.createUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required." });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format." });
    }

    // Create user
    const user = await User.create({ name, email });
    res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);

    // Handle duplicate email
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ error: "Email already exists." });
    }

    res.status(500).json({ error: "Failed to create user" });
  }
};

// Get all tasks for a specific user
exports.getUserTasks = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id, {
      include: [Task],
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user.Tasks);
  } catch (error) {
    console.error("Error fetching user tasks:", error);
    res.status(500).json({ error: "Failed to fetch user tasks" });
  }
};
