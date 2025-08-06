import { useRef, useState } from "react";
import CanvasBoard from "./components/Canvas";
import Toolbar from "./components/Toolbar";
import {
  type ReactSketchCanvasRef
} from 'react-sketch-canvas'

export function Home({ username }: { username: string }) {
  const canvasRef = useRef<ReactSketchCanvasRef>(null)
  const [strokeColor, setStrokeColor] = useState('#a855f7')
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome, {username}!</h1>
        <CanvasBoard canvasRef={canvasRef} username={username} strokeColor={strokeColor} />
        <Toolbar canvasRef={canvasRef} strokeColor={strokeColor} setStrokeColor={setStrokeColor} />
      </header>
    </div>
  );
}
