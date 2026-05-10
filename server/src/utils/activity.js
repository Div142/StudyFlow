import { Activity } from "../models/Activity.js";
import { emitWorkspaceEvent } from "../socket/socket.js";

export async function createActivity(req, activity) {
  const event = await Activity.create({
    actor: req.user._id,
    ...activity,
  });

  const populated = await event.populate("actor", "username email avatarUrl");
  emitWorkspaceEvent(req, activity.workspace, "activity:created", populated);
  return populated;
}
