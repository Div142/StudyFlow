import mongoose from "mongoose";

const subtaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 160,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 160,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 4000,
      default: "",
    },
    status: {
      type: String,
      enum: ["todo", "doing", "done"],
      default: "todo",
    },
    priority: {
      type: String,
      enum: ["urgent", "normal", "later"],
      default: "normal",
    },
    dueAt: {
      type: Date,
      default: null,
    },
    order: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String],
      default: [],
    },
    subtasks: {
      type: [subtaskSchema],
      default: [],
    },
    workspace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      default: null,
    },
    assignees: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

taskSchema.index({ workspace: 1, status: 1, order: 1 });
taskSchema.index({ project: 1, dueAt: 1 });
taskSchema.index({ title: "text", description: "text", tags: "text" });

export const Task = mongoose.model("Task", taskSchema);
