import type { WebSocketHandler } from "bun"

export const websocket: WebSocketHandler = {
    open: (ws) => ws.subscribe('chat'),
    message: (ws, message) => {ws.publish('chat', message)},
    close(ws){ws.unsubscribe('chat')}
}