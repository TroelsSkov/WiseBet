// import { io } from "socket.io-client";

// export const socket = io("http://localhost:3001", {
//     transports: ["websocket"]
// });

import * as signalR from "@microsoft/signalr";
/**
 * connects to backend gamehub. holds the connection active and makes it possible to send and retrieve data from the backend
 */
export const connection = new signalR.HubConnectionBuilder()
  .withUrl(`${import.meta.env.VITE_BACKEND_URL}/Gamehub`, {withCredentials: true})
  .withAutomaticReconnect()
  .build();
