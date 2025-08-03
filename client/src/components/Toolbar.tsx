import '../styles/Toolbar.css';

const Toolbar = () => {
  return (
    <div className="toolbar">
      <button className="toolbar-button" title="Free Draw">✏️</button>
      <button className="toolbar-button" title="Undo">↶</button>
      <button className="toolbar-button" title="Redo">↷</button>
      <button className="toolbar-button" title="Clear">🗑️</button>
    </div>
  );
}

export default Toolbar;
