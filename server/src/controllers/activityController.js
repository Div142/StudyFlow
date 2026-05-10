import { Activity } from "../models/Activity.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const listActivity = asyncHandler(async (req, res) => {
  const activity = await Activity.find({ workspace: req.workspace._id })
    .populate("actor", "username email avatarUrl")
    .populate("project", "name icon color")
    .populate("task", "title status priority dueAt")
    .sort({ createdAt: -1 })
    .limit(50);

  res.json({ activity });
});
