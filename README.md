# ✏️ Collaborative Drawing App

A real-time collaborative drawing canvas built with **React**, **React-Konva**, and **WebSockets**. Multiple users can connect simultaneously to sketch, draw shapes, and view each other's live cursors, just like Figma or Excalidraw-lite.

---

## 🌟 Features

✅ **Real-Time Collaboration**  *(in progress)* 
Connect with others and draw together, all updates are instantly synced using WebSockets.

✅ **Live Cursors**  
See everyone’s cursors move across the canvas in real-time, complete with color and smooth animation.

✅ **Freehand Drawing**
Click and drag to draw smooth lines, ideal for sketching or brainstorming.

✅ **Shape Tools** *(in progress)*  
Support for rectangles, circles, and more, easily create and manipulate visual elements.


<img width="1404" height="849" alt="image" src="https://github.com/user-attachments/assets/b63248e1-242a-4c46-8a9e-49ece40a8f25" />

---

## 🚀 Tech Stack

| Frontend        | Backend       | Other              |
|-----------------|---------------|--------------------|
| React + Vite    | Node.js       | WebSockets (ws)    |
| react-sketch-canvas    |               | Canvas Elements |
| TypeScript      |               | Perfect Cursors    |

---

## 📦 Getting Started

### 1. Clone the Repo
```bash
git clone https://github.com/yourusername/collaborative-drawing-app.git
cd collaborative-drawing-app
cd client
npm start
cd ../server
node index.js
