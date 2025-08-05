import CanvasBoard from "./components/Canvas";
import Toolbar from "./components/Toolbar";

export function Home({ username }: { username: string }) {

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome, {username}!</h1>
        <CanvasBoard username={username} />
        <Toolbar />
      </header>
    </div>
  );
}
