import * as signalR from "@microsoft/signalr";

export const chatConnection = new signalR.HubConnectionBuilder()
  .withUrl(`${import.meta.env.VITE_BACKEND_URL}/Chat`, {withCredentials: true})
  .withAutomaticReconnect()
  .build();
