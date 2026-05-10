import mongoose from "mongoose";

const workspaceMemberSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["owner", "admin", "member"],
      default: "member",
    },
  },
  { _id: false },
);

const workspaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 280,
      default: "",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [workspaceMemberSchema],
  },
  { timestamps: true },
);

workspaceSchema.index({ owner: 1, name: 1 });
workspaceSchema.index({ "members.user": 1 });

export const Workspace = mongoose.model("Workspace", workspaceSchema);
