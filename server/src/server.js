import http from "http";
import { Server } from "socket.io";
import { connectDb } from "./config/db.js";
import { env } from "./config/env.js";
import { createApp } from "./app.js";
import { configureSocket } from "./socket/socket.js";

async function bootstrap() {
  await connectDb();

  const app = createApp();
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: env.clientOrigin,
      credentials: true,
    },
  });

  configureSocket(io);
  app.set("io", io);

  server.listen(env.port, () => {
    console.log(`StudyFlow API listening on port ${env.port}`);
  });
}

bootstrap().catch((error) => {
  console.error("Failed to start StudyFlow API");
  console.error(error);
  process.exit(1);
});
