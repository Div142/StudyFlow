import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },
    icon: {
      type: String,
      default: "P",
      maxlength: 4,
    },
    color: {
      type: String,
      default: "#ec7fa9",
    },
    workspace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

projectSchema.index({ workspace: 1, name: 1 });

export const Project = mongoose.model("Project", projectSchema);
