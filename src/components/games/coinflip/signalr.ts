// import { io } from "socket.io-client";

// export const socket = io("http://localhost:3001", {
//     transports: ["websocket"]
// });

import * as signalR from "@microsoft/signalr";

export const connection = new signalR.HubConnectionBuilder()
  .withUrl("http://localhost:3000/gamehub")
  .withAutomaticReconnect()
  .build();

