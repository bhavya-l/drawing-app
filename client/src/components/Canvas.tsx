import "../styles/Canvas.css";
import { useEffect, useRef } from "react";
import useWebSocket from "react-use-websocket";
import throttle from "lodash.throttle";
import { Cursor } from "./Cursor";

const renderCursors = (users: any) => {
  return Object.keys(users).map((userId) => {
    const user = users[userId];
    return <Cursor key={userId} point={[user.state.x, user.state.y]}></Cursor>;
  });
};

export default function CanvasBoard({ username }: { username: string }) {
  const WS_URL = "ws://127.0.0.1:8000";
  const socket = useWebSocket(WS_URL, {
    queryParams: { username },
  });

  const THROTTLE = 100;
  const sendJsonMessageThrottled = useRef(
    throttle(socket.sendJsonMessage, THROTTLE)
  );

  useEffect(() => {
    socket.sendJsonMessage({
      x: 0,
      y: 0,
    });
    window.addEventListener("mousemove", (e) => {
      sendJsonMessageThrottled.current({
        x: e.clientX,
        y: e.clientY,
      });
    });
  }, []);

  if (socket.lastJsonMessage) {
    return (
      <div className="canvas">{renderCursors(socket.lastJsonMessage)}</div>
    );
  }

  return (
    <div className="canvas">
    </div>
  );
}
