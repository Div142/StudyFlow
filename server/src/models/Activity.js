import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    actor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      default: null,
    },
    type: {
      type: String,
      enum: ["task.created", "task.updated", "task.deleted", "project.created", "workspace.updated"],
      required: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 240,
    },
  },
  { timestamps: true },
);

activitySchema.index({ workspace: 1, createdAt: -1 });

export const Activity = mongoose.model("Activity", activitySchema);
