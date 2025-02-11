import WebSocketManager from "@/stores/WebsocketManager";
import { useEffect } from "react";

export function useWebSocket(omitString: string, callBackFunction: () => void) {
    useEffect(() => {
        callBackFunction();

        const socket = WebSocketManager.getInstance();
        socket.on(omitString, callBackFunction);

        return () => {
            socket.off(omitString, callBackFunction);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}