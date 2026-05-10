const onlineUsers = new Map();

export function configureSocket(io) {
  io.on("connection", (socket) => {
    socket.on("user:online", ({ userId }) => {
      if (!userId) return;
      onlineUsers.set(userId, socket.id);
      io.emit("presence:update", { userId, online: true });
    });

    socket.on("workspace:join", ({ workspaceId }) => {
      if (workspaceId) {
        socket.join(`workspace:${workspaceId}`);
      }
    });

    socket.on("disconnect", () => {
      for (const [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          io.emit("presence:update", { userId, online: false });
          break;
        }
      }
    });
  });
}

export function emitWorkspaceEvent(req, workspaceId, eventName, payload) {
  req.app.get("io")?.to(`workspace:${workspaceId}`).emit(eventName, payload);
}
