import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

export function createStudyFlowSocket({ userId, workspaceId, onTaskCreated, onTaskUpdated, onActivityCreated, onPresence }) {
  const socket = io(SOCKET_URL, {
    autoConnect: false,
    transports: ["websocket"],
  });

  socket.on("connect", () => {
    socket.emit("user:online", { userId });
    socket.emit("workspace:join", { workspaceId });
  });

  socket.on("task:created", onTaskCreated);
  socket.on("task:updated", onTaskUpdated);
  socket.on("activity:created", onActivityCreated);
  socket.on("presence:update", onPresence);
  socket.connect();

  return socket;
}
