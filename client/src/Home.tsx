import CanvasBoard from "./components/Canvas";
import Toolbar from "./components/Toolbar";
import useWebSocket from "react-use-websocket";
import throttle from "lodash.throttle";
import { useRef } from "react";

export function Home({ username }: { username: string }) {
    const WS_URL = "ws://127.0.0.1:8000";
    const socket = useWebSocket(WS_URL, {
        queryParams: { username },
    });

    const THROTTLE = 50;
    const sendJsonMessageThrottled = useRef(
        throttle(socket.sendJsonMessage, THROTTLE)
    );
    
    return (
        <div className="App">
            <header className="App-header">
                <h1>Welcome, {username}!</h1>
                <CanvasBoard />
                <Toolbar />
            </header>
        </div>
    )
}