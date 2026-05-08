import * as signalR from "@microsoft/signalr";

export const connection = new signalR.HubConnectionBuilder()
    .withUrl(`${import.meta.env.VITE_BACKEND_URL}/Gamehub`, { withCredentials: true })
    .withAutomaticReconnect()
    .build();
