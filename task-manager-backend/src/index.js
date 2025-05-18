const express = require("express");
const cors = require("cors");
const sequelize = require("./config/config");
require("dotenv").config();

// Import models
const User = require("./models/user");
const Task = require("./models/task");

// Import routes
const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// Routes
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

// Start server after syncing database
const PORT = process.env.PORT || 4000;

sequelize.sync({ alter: true }).then(() => {
  console.log("Database synced ✅");

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});