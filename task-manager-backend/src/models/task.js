const { DataTypes } = require("sequelize");
const sequelize = require("../config/config");
const User = require("./user");

const Task = sequelize.define("Task", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("pending", "in-progress", "completed"),
    defaultValue: "pending",
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Users",
      key: "id",
    },
  },
});

Task.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Task, { foreignKey: "userId" });

module.exports = Task;