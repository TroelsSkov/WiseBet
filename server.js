import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
app.use(cors());
app.use(express.json());

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Client connected", socket.id);

  socket.on("playround", ({ amount, choice }) => {
    const result = Math.random() > 0.5 ? 0 : 1;

    const win = result === choice;
    const winnings = win ? amount * 2 : 0;

    socket.emit("round-result", {
      result,
      win,
      winnings,
    });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

httpServer.listen(3001, () => {
  console.log("WebSocket running on http://localhost:3001");
});