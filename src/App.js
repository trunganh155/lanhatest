import "./App.css";
import Control from "./components/Control/Control";
import Design from "./components/Design/Design";

function App() {
  return (
    <div style={{ position: "relative" }}>
      <div className="container__design">
        <Design />
      </div>

      <div className="container__main">
        <Control />
      </div>
    </div>
  );
}

export default App;
