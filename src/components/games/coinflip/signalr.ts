import * as signalR from "@microsoft/signalr";
/**
 * connects to backend gamehub. holds the connection active and makes it possible to send and retrieve data from the backend
 */
export const connection = new signalR.HubConnectionBuilder()
  .withUrl(`${import.meta.env.VITE_BACKEND_URL}/Gamehub`, {withCredentials: true})
  .withAutomaticReconnect()
  .build();
