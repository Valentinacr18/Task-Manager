const Task = require("../models/task");

// Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

// Create new task with validations
exports.createTask = async (req, res) => {
  try {
    const { title, description, dueDate, status, userId } = req.body;

    // Required fields
    if (!title || !dueDate || !userId) {
      return res.status(400).json({ error: "Title, dueDate and userId are required." });
    }

    // dueDate must be valid and in the future
    const now = new Date();
    const parsedDueDate = new Date(dueDate);

    if (isNaN(parsedDueDate.getTime())) {
      return res.status(400).json({ error: "Invalid dueDate format." });
    }

    if (parsedDueDate < now) {
      return res.status(400).json({ error: "Due date must be in the future." });
    }

    // status must be valid if provided
    const allowedStatuses = ["pending", "in-progress", "completed"];
    if (status && !allowedStatuses.includes(status)) {
      return res.status(400).json({ error: `Invalid status. Allowed: ${allowedStatuses.join(", ")}` });
    }

    // Create task
    const newTask = await Task.create({
      title,
      description,
      dueDate: parsedDueDate,
      status,
      userId
    });

    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Failed to create task" });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate, status, userId } = req.body;

    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ error: "Task not found" });

    await task.update({ title, description, dueDate, status, userId });

    res.json(task);
  } catch (error) {
    res.status(400).json({ error: "Failed to update task" });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ error: "Task not found" });

    await task.destroy();
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Failed to delete task" });
  }
};