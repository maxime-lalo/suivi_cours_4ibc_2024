import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Title, { EColor } from "./components/elements/Title";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Title title="Mon super titre" />
        <Title title="Mon super titre 2" color={EColor.GREEN} />
        <Title title="Mon super titre 3" color={EColor.RED} />
      </header>
    </div>
  );
}

export default App;
