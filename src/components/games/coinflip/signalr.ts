// import { io } from "socket.io-client";

// export const socket = io("http://localhost:3001", {
//     transports: ["websocket"]
// });

import * as signalR from "@microsoft/signalr";
/**
 * connects to backend gamehub. holds the connection active and makes it possible to send and retrieve data from the backend
 */
export const connection = new signalR.HubConnectionBuilder()
  .withUrl("http://172.20.10.3:5277/gamehub")
  .withAutomaticReconnect()
  .build();
