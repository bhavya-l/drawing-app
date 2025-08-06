import { type ChangeEvent, RefObject, useState, useRef } from "react";
import "../styles/Toolbar.css";
import { type ReactSketchCanvasRef } from "react-sketch-canvas";

interface ToolbarProps {
  canvasRef: RefObject<ReactSketchCanvasRef | null>;
  setStrokeColor: (color: string) => void;
  strokeColor?: string;
}

export default function Toolbar({
  canvasRef,
  setStrokeColor,
  strokeColor,
}: ToolbarProps) {
  const colorInputRef = useRef<HTMLInputElement>(null);
  const [eraseMode, setEraseMode] = useState(true);

  function handleStrokeColorChange(event: ChangeEvent<HTMLInputElement>) {
    setStrokeColor(event.target.value);
  }

  function handleEraserClick() {
    setEraseMode(true);
    canvasRef.current?.eraseMode(true);
  }

  function handlePenClick() {
    setEraseMode(false);
    canvasRef.current?.eraseMode(false);
  }

  function handleUndoClick() {
    canvasRef.current?.undo();
  }

  function handleRedoClick() {
    canvasRef.current?.redo();
  }
  function handleClearClick() {
    canvasRef.current?.clearCanvas();
  }
  return (
    <div className="toolbar">
      <button
        className="toolbar-button"
        title="Color Picker"
        style={{
          backgroundColor: strokeColor,
        }}
        onClick={() => colorInputRef.current?.click()}
      />
      <input
        type="color"
        ref={colorInputRef}
        value={strokeColor}
        onChange={handleStrokeColorChange}
        style={{ display: "none" }}
      />
      <button
        className="toolbar-button"
        title="Free Draw"
        style={{
          border: eraseMode ? "none" : "2px solid #000",
        }}
        onClick={handlePenClick}
      >
        ✏️
      </button>
      <button
        className="toolbar-button"
        title="Eraser"
        style={{
          border: eraseMode ? "2px solid #000" : "none", // border when erase selected
        }}
        onClick={handleEraserClick}
      >
        🧽
      </button>
      <button className="toolbar-button" title="Undo" onClick={handleUndoClick}>
        ↶
      </button>
      <button className="toolbar-button" title="Redo" onClick={handleRedoClick}>
        ↷
      </button>
      <button
        className="toolbar-button"
        title="Clear"
        onClick={handleClearClick}
      >
        🗑️
      </button>
    </div>
  );
}
