import { io, Socket } from "socket.io-client";

const baseApiUrl = import.meta.env.VITE_BASE_API;

class WebSocketManager {
    private static instance: Socket;

    private constructor() { }

    public static getInstance(): Socket {
        if (!WebSocketManager.instance) {
            WebSocketManager.instance = io(baseApiUrl, {
                reconnectionAttempts: 5,
                reconnectionDelay: 1000,
            });

            WebSocketManager.instance.on("connect", () => {
                console.log("Connected to WebSocket server");
            });

            WebSocketManager.instance.on("connect_error", (error) => {
                console.error("Connection error:", error);
            });
        }

        return WebSocketManager.instance;
    }
}

export default WebSocketManager;