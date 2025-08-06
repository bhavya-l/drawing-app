import "../styles/Canvas.css";
import { RefObject, useEffect, useRef } from "react";
import useWebSocket from "react-use-websocket";
import throttle from "lodash.throttle";
import { Cursor } from "./Cursor";
import {
  ReactSketchCanvas,
  type ReactSketchCanvasRef,
} from "react-sketch-canvas";

interface CanvasBoardProps {
  canvasRef: RefObject<ReactSketchCanvasRef | null>;
  username: string;
  strokeColor: string;
}

const renderCursors = (users: any) => {
  return Object.keys(users).map((userId) => {
    const user = users[userId];
    return <Cursor key={userId} point={[user.state.x, user.state.y]}></Cursor>;
  });
};

export default function CanvasBoard({ canvasRef, username, strokeColor }: CanvasBoardProps) {
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
      <div>
        <ReactSketchCanvas
          ref={canvasRef}
          strokeWidth={4}
          strokeColor={strokeColor}
          style={{
            width: "100%",
            minWidth: "1200px",
            height: "500px",
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: "8px",
            margin: "0 auto",
            display: "block",
          }}
        />

        {renderCursors(socket.lastJsonMessage)}
      </div>
    );
  }

  return (
    <ReactSketchCanvas
      ref={canvasRef}
      strokeWidth={4}
      strokeColor="red"
      style={{
        width: "100%",
        maxWidth: "1200px",
        height: "500px",
        backgroundColor: "white",
        border: "1px solid #ccc",
        borderRadius: "8px",
        margin: "0 auto",
        display: "block",
      }}
    />
  );
}
