const mongoose = require("mongoose");
const { generateTaskCode } = require("../utils/uuid");
const { TaskPriorityEnum, TaskStatusEnum } = require("../enums/task.enum");

const taskSchema = new mongoose.Schema(
  {
    taskCode: {
      type: String,
      unique: true,
      default: generateTaskCode,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: null,
    },

    // Reference to the project the task belongs to
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    // Reference to the workspace the task belongs to
    workspace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },

    // Reference to the user the task is assigned to
    status: {
      type: String,
      enum: Object.values(TaskStatusEnum),
      default: TaskStatusEnum.TODO,
    },

    // Reference to the user the task is assigned to
    priority: {
      type: String,
      enum: Object.values(TaskPriorityEnum),
      default: TaskPriorityEnum.MEDIUM,
    },

    // Reference to the user the task is assigned to
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    //  Reference to the user who created the task
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dueDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const TaskModel = mongoose.model("Task", taskSchema);
module.exports = TaskModel;
