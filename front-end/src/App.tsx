import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Title, { EColor } from "./components/elements/Title";
import Counter from "./components/elements/Counter";
import Timer from "./components/elements/Timer";
import TimerClass from "./components/elements/TimerClass";
import useOpenable from "./hooks/useOpenable";
import Table, { ECellType } from "./components/elements/Table";

function App() {
  const { isOpen, toggle } = useOpenable(true);
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
        <Counter />
        <button onClick={() => toggle()}>Toggle</button>
        {isOpen && (
          <>
            <Timer seconds={10} />
            <TimerClass seconds={10} />
          </>
        )}
        <Table
          tableHeads={[
            {
              cellType: ECellType.EURO,
              label: "Prix",
            },
            {
              cellType: ECellType.PERCENTAGE,
              label: "Remise",
            },
            {
              cellType: ECellType.TEXT,
              label: "Nom",
            },
            {
              cellType: ECellType.PATATE,
              label: "Patate",
            },
          ]}
          tableData={[
            {
              Remise: 50,
              Nom: "Article",
              Prix: 500000000,
              Patate: "PATATE",
            },
            {
              Prix: 100,
              Remise: 10,
              Nom: "Article 2",
            },
          ]}
        />
        <Title title="Mon super titre" />
        <Title title="Mon super titre 2" color={EColor.GREEN} />
        <Title title="Mon super titre 3" color={EColor.RED} />
      </header>
    </div>
  );
}

export default App;
